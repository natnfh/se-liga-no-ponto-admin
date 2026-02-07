# Plano Mestre — Integração Asaas (assinaturas) + Admin unificado + Web/Mobile

> **Escopo:** este documento é um plano de execução. Não aplica mudanças na VPS nem no monorepo `se-liga-no-ponto-firebase` agora.

## 1) Objetivo / “Definition of Done” (DoD)

Quando este plano estiver implementado, o ecossistema **Se Liga No Ponto** deve:

1. Vender **assinaturas recorrentes** (mensal/anual) via **Asaas** (checkout web).
2. Refletir o status da assinatura no **webapp** e no **mobile (Capacitor)**, sem IAP.
3. Bloquear/desbloquear rotas premium no **backend** com base em status persistido.
4. Ter um **Admin Panel** (este repo) para:
   - listar assinaturas e pagamentos
   - inspecionar webhooks recebidos
   - reprocessar eventos (replay)
   - conciliar inconsistências
5. Rodar em **VPS + Coolify + Postgres** com hardening mínimo e observabilidade.

Não-objetivos (agora):
- In-App Purchase Apple/Google
- Split complexos/marketplace

---

## 2) Contexto atual (fonte)

O monorepo de produção (`se-liga-no-ponto-firebase`) indica:

- `services/api`: **Express**; valida Firebase ID token; persiste em **Postgres**.
- `apps/web`: React/Vite/PWA.
- `apps/mobile`: Capacitor (Android/iOS), consumo de API.
- Deploy: **VPS via Coolify** e Postgres presente.

Este repo (`se-liga-no-ponto-admin`) é um painel React/Vite (front-only) que será evoluído para consumir endpoints admin do backend.

---

## 3) Arquitetura alvo (alto nível)

### 3.1 Componentes

1. **Asaas (externo)**
   - clientes, assinaturas, cobranças/pagamentos
   - webhooks para eventos

2. **Backend API (`services/api`)**
   - integra Asaas via API key
   - expõe endpoints de checkout e status para web/mobile
   - recebe webhooks do Asaas
   - persiste tudo no Postgres (fonte interna de verdade)
   - expõe endpoints admin/internal para o painel

3. **Postgres (produção)**
   - fonte de verdade para **acesso premium**
   - auditoria de webhooks
   - reconciliação

4. **Webapp/Mobile**
   - chama `POST /billing/checkout` → redireciona para Asaas
   - consulta `GET /billing/status`

5. **Admin (este repo)**
   - login (Firebase)
   - listagens e operações de suporte

### 3.2 Princípios

- **Nunca** expor `ASAAS_API_KEY` em front.
- Webhook deve ser: **validado + idempotente + auditável + reprocessável**.
- Acesso premium deve depender de estado persistido (Postgres), não do front.

---

## 4) Dados (Postgres) — modelo proposto

> Nomes são sugestivos. Adapte ao padrão do monorepo.

### 4.1 Tabelas

#### `billing_customers`
- `id` uuid pk
- `firebase_uid` text unique not null
- `email` text
- `asaas_customer_id` text unique not null
- `created_at`, `updated_at`

#### `billing_plans`
- `id` uuid pk
- `code` text unique not null  (ex.: `monthly`, `yearly`)
- `name` text not null
- `price_cents` int not null
- `currency` text default 'BRL'
- `active` bool default true
- `asaas_plan_id` text null (opcional)

#### `billing_subscriptions`
- `id` uuid pk
- `firebase_uid` text index not null
- `plan_code` text not null
- `asaas_subscription_id` text unique not null
- `status` text not null  (ex.: `active|inactive|past_due|canceled`)
- `current_period_start` timestamptz null
- `current_period_end` timestamptz null
- `cancel_at_period_end` bool default false
- `created_at`, `updated_at`

#### `billing_payments`
- `id` uuid pk
- `firebase_uid` text index not null
- `asaas_payment_id` text unique not null
- `subscription_id` uuid null
- `type` text not null (ex.: `subscription_cycle|one_time`)
- `value_cents` int not null
- `billing_type` text null (pix|boleto|credit_card)
- `status` text not null
- `due_date` date null
- `paid_at` timestamptz null
- `invoice_url` text null
- `bank_slip_url` text null
- `pix_qr_code` text null
- `created_at`, `updated_at`

#### `billing_webhook_events`
- `id` uuid pk
- `provider` text not null default 'asaas'
- `event_id` text unique null
- `payload_hash` text unique null
- `event_type` text not null
- `payload_json` jsonb not null
- `received_at` timestamptz not null
- `processed_at` timestamptz null
- `status` text not null (pending|processed|failed)
- `retry_count` int not null default 0
- `error` text null

#### `entitlements` (para add-ons futuros)
- `firebase_uid` text index not null
- `key` text not null
- `value` jsonb null
- `expires_at` timestamptz null
- `source` text not null (subscription|payment|manual)
- unique (`firebase_uid`, `key`)

### 4.2 Regras de normalização (internas)

Definir um conjunto pequeno de status internos e mapear os status/eventos da Asaas para eles.

Status internos recomendados para assinatura:
- `active`
- `past_due`
- `canceled`
- `inactive`

> Observação: decidir tolerância de atraso é requisito de negócio (ver seção 11).

---

## 5) Contratos de API (endpoints)

### 5.1 App (web/mobile)

#### `POST /api/v2/billing/checkout`
- Auth: Firebase ID Token
- Body: `{ "plan": "monthly" | "yearly" }`
- Responsabilidades:
  - garantir customer Asaas (criar se necessário)
  - criar assinatura ou cobrança inicial
  - retornar URL do checkout/pagamento
- Response: `{ "url": "https://..." }`

#### `GET /api/v2/billing/status`
- Auth: Firebase ID Token
- Response:
```json
{
  "plan": "monthly",
  "subscriptionStatus": "active",
  "currentPeriodEnd": "2026-03-07T00:00:00.000Z",
  "entitlements": { "premium": true }
}
```

### 5.2 Webhook Asaas

#### `POST /api/v2/billing/asaas/webhook`
- Sem auth de usuário
- Proteção por secret/token (header) + validações
- Deve:
  1) gravar evento em `billing_webhook_events`
  2) aplicar idempotência (unique constraint)
  3) processar/atualizar Postgres
  4) registrar erro para replay

### 5.3 Admin/Internal

Recomendado expor sob `/internal/admin/*` e proteger por RBAC:

- `GET /internal/admin/billing/subscriptions?...`
- `GET /internal/admin/billing/payments?...`
- `GET /internal/admin/billing/webhooks?...`
- `POST /internal/admin/billing/webhooks/:id/reprocess`

---

## 6) Eventos Asaas (assinatura/pagamento) — mapeamento

> Esta seção deve ser confirmada no momento da implementação com a documentação atual da Asaas.

### 6.1 Eventos a assinar no webhook

Minimamente (por entidade):

- **Payments**: criado, atualizado, recebido/confirmado, estornado, vencido/overdue, cancelado
- **Subscriptions**: criado, atualizado, cancelado

### 6.2 Política de atualização

Regras recomendadas:

1) Evento de pagamento confirmado/recebido:
- upsert `billing_payments`
- se ligado à assinatura: atualizar `billing_subscriptions.status = active` e avançar `current_period_end`
- recalcular `entitlements`

2) Evento overdue/past_due:
- marcar `billing_payments.status = overdue`
- marcar `billing_subscriptions.status = past_due`
- aplicar regra de tolerância (pode manter premium por X dias)

3) Evento cancelamento:
- marcar assinatura como `canceled`
- remover premium no fim do período (se cancelamento ao fim do ciclo) ou imediatamente (se regra assim)

---

## 7) Fluxos ponta-a-ponta

### 7.1 Assinatura (web → Asaas → webhook → app)

1. Usuário (web) clica em assinar.
2. Web chama `POST /billing/checkout`.
3. Backend cria/garante customer e cria assinatura/cobrança.
4. Web redireciona usuário para URL retornada.
5. Asaas confirma pagamento e chama webhook.
6. Backend processa evento e atualiza Postgres.
7. App/web/mobile chama `GET /billing/status` e libera premium.

### 7.2 Renovação

- Mesmo fluxo via eventos de pagamento recorrente.

---

## 8) Admin Panel — páginas e features

### 8.1 Autenticação

- Login com Firebase Auth.
- Backend define RBAC (ex.: tabela `admin_users` ou claim/custom claim) e autoriza `/internal/admin/*`.

### 8.2 Telas

1) **Subscriptions**
- filtros (status, plano, UID/email)
- detalhes (período, cancelamento)

2) **Payments**
- filtros (status, período)
- links/URLs de boleto/pix quando aplicável

3) **Webhooks Inbox**
- lista eventos (pending/processed/failed)
- visualizar payload
- botão **Reprocessar**

4) **Reconciliation (fase 2)**
- rodar job manual de conciliação
- lista divergências

---

## 9) Hardening (VPS + Coolify)

### 9.1 Secrets/ENV
- `ASAAS_API_KEY`
- `ASAAS_ENV` (sandbox|production)
- `ASAAS_WEBHOOK_SECRET` (ou token)
- `PUBLIC_APP_URL` (para retornos e links)

### 9.2 Proteções
- rate-limit em `POST /billing/checkout`
- webhook idempotente
- logs estruturados

### 9.3 Admin público “só você”

Camadas recomendadas:
1) Login + RBAC (obrigatório)
2) Cloudflare Access ou Basic Auth no domínio `admin.*` (recomendado)

---

## 10) Plano de execução (tarefas numeradas + estimativa)

> Estimativas “pessoa-sessão” (1 sessão = 1 bloco de trabalho ~ 1–3h). Ajuste ao seu ritmo.

### Fase 0 — Preparação (1 sessão)
0.1 Criar ambiente **sandbox** Asaas
0.2 Configurar produtos/valores mensal/anual
0.3 Definir URLs de retorno

### Fase 1 — Banco + base do módulo Asaas (2–4 sessões)
1.1 Especificar migrations SQL (tabelas da seção 4)
1.2 Implementar `asaasClient` (HTTP) com retries e timeouts
1.3 Implementar serviço `billingService` com:
   - ensureCustomer(uid, email)
   - createCheckout(plan)
   - getStatus(uid)

### Fase 2 — Webhook robusto (2–3 sessões)
2.1 Criar endpoint webhook
2.2 Implementar idempotência + auditoria (`billing_webhook_events`)
2.3 Implementar processador de eventos
2.4 Adicionar replay admin

### Fase 3 — App/web/mobile (1–2 sessões)
3.1 Atualizar paywall/botões para chamar `/billing/checkout`
3.2 Implementar refresh de status após retorno
3.3 Garantir middleware de assinatura em rotas premium

### Fase 4 — Admin real (3–6 sessões)
4.1 Login Firebase + RBAC
4.2 Páginas: subscriptions/payments/webhooks
4.3 Tela de detalhes e ações (reprocess)

### Fase 5 — Produção (1–2 sessões)
5.1 Virar `ASAAS_ENV=production`
5.2 Configurar webhook prod
5.3 Rodar conciliação inicial
5.4 Checklist de rollback

---

## 11) Decisões em aberto (anotar antes de codar)

1) Regra para `past_due`:
- corta premium imediatamente?
- tolerância de X dias?

2) Cancelamento:
- imediato?
- ao fim do período?

3) Add-ons:
- serão avulsos, recorrentes, ou ambos?
  - recomendação: modelar via `entitlements` + `billing_payments.type=one_time`.

---

## 12) Checklist final de validação (E2E)

- [ ] Criar assinatura mensal no sandbox e ver `active` no Postgres
- [ ] Webhook idempotente: replay não duplica
- [ ] Rota premium bloqueia quando status != active
- [ ] Webapp e mobile refletem status
- [ ] Admin lista assinaturas/pagamentos e mostra inbox de webhooks
- [ ] Deploy no Coolify com secrets OK
- [ ] Conciliação diária (opcional) OK
