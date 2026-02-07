import React, { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, Vector2 } from 'three'
import { usePrefersReducedMotion } from './motion'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    float ripple = cos(dist * 25.0 - uStrength * 4.0);
    vec2 offset = (uv - uMouse) * ripple * uStrength * 0.06;
    vec4 color = texture2D(uTexture, uv + offset);
    gl_FragColor = color;
  }
`

function LiquidPlane({ src, hoverStrength }: { src: string; hoverStrength: number }) {
  const texture = useLoader(TextureLoader, src)
  const meshRef = useRef<any>(null)
  const mouse = useRef(new Vector2(0.5, 0.5))

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.material.uniforms.uStrength.value = hoverStrength
    meshRef.current.material.uniforms.uMouse.value = mouse.current
  })

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(event) => {
        mouse.current.set(event.uv?.x ?? 0.5, event.uv?.y ?? 0.5)
      }}
      onPointerLeave={() => {
        mouse.current.set(0.5, 0.5)
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={useMemo(
          () => ({
            uTexture: { value: texture },
            uMouse: { value: mouse.current },
            uStrength: { value: hoverStrength },
          }),
          [texture, hoverStrength],
        )}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

type LiquidImageProps = {
  src: string
  className?: string
  alt?: string
  cursorLabel?: string
}

export function LiquidImage({ src, className, alt, cursorLabel = 'VIEW' }: LiquidImageProps) {
  const [hovered, setHovered] = useState(false)
  const reduce = usePrefersReducedMotion()
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

  if (reduce || isMobile) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div
      className={['relative overflow-hidden rounded-2xl', className].filter(Boolean).join(' ')}
      data-cursor={cursorLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Suspense fallback={<div className="h-full w-full bg-white/5" />}> 
        <Canvas className="h-full w-full">
          <LiquidPlane src={src} hoverStrength={hovered ? 1 : 0.2} />
        </Canvas>
      </Suspense>
    </div>
  )
}