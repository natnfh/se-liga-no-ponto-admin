
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const data = [
  { name: 'Mon', active: 400, errors: 24, revenue: 2400 },
  { name: 'Tue', active: 300, errors: 13, revenue: 2210 },
  { name: 'Wed', active: 200, errors: 98, revenue: 2290 },
  { name: 'Thu', active: 278, errors: 39, revenue: 2000 },
  { name: 'Fri', active: 189, errors: 48, revenue: 2181 },
  { name: 'Sat', active: 239, errors: 38, revenue: 2500 },
  { name: 'Sun', active: 349, errors: 43, revenue: 2100 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-indigo-600">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="2,842" change="12.5%" isPositive={true} icon={Users} />
        <StatCard title="Active Subs" value="1,120" change="8.2%" isPositive={true} icon={TrendingUp} />
        <StatCard title="API Health" value="99.9%" change="0.1%" isPositive={true} icon={Activity} />
        <StatCard title="Total Errors" value="154" change="23%" isPositive={false} icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">User Activity (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="active" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Revenue Growth (Asaas)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold">Recent Pipeline Activity</h3>
          <button className="text-indigo-600 text-sm font-medium hover:underline">View all logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { s: 'TudoAzul Scraper', t: 'Cron Job', st: 'Success', d: '24s', tm: '2 mins ago' },
                { s: 'LATAM Pipeline', t: 'Manual Trigger', st: 'Success', d: '1.2m', tm: '15 mins ago' },
                { s: 'Smiles Engine', t: 'Cron Job', st: 'Error', d: '0s', tm: '1 hour ago' },
                { s: 'Asaas Webhook', t: 'Incoming', st: 'Success', d: '120ms', tm: '3 hours ago' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.s}</td>
                  <td className="px-6 py-4 text-slate-500">{row.t}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      row.st === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.st}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{row.d}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{row.tm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
