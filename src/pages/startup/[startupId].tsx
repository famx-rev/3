import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, BarChart3, FileText, Globe, Lock, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const services = [
  { label: 'Auth', icon: Lock, path: 'auth' },
  { label: 'Legal', icon: FileText, path: 'legal' },
  { label: 'Team', icon: Users, path: 'team' },
  { label: 'Billing', icon: TrendingUp, path: 'billing' },
] as const;

const profiles: Record<string, { name: string; domain: string; description: string; users: string }> = {
  'northstar-ai': { name: 'Northstar AI', domain: 'northstar.ai', description: 'An intelligent operating layer for planning, compliance, and execution.', users: '2.4k' },
  'orbit-health': { name: 'Orbit Health', domain: 'orbit.health', description: 'People, providers, and care plans in one calm digital experience.', users: '1.8k' },
  'pixel-forge': { name: 'Pixel Forge', domain: 'pixelforge.dev', description: 'Turn ideas into production-ready interfaces without slowing down.', users: '5.1k' },
};

export const StartupDetail = () => {
  const { startupId } = useParams<{ startupId: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const profile = useMemo(() => profiles[startupId ?? ''] ?? { name: startupId ?? 'Startup', domain: 'coming soon', description: 'Workspace for this startup.', users: '0' }, [startupId]);

  const stats = [
    { label: 'Active users', value: profile.users, icon: Users },
    { label: 'Health score', value: '75/100', icon: ShieldCheck },
    { label: 'Monthly revenue', value: '$0', icon: TrendingUp },
    { label: 'API requests', value: '18.2k', icon: BarChart3 },
  ];

  return (
    <div>
      <div className={`mb-6 rounded-3xl border p-7 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">Startup dashboard</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{profile.name}</h1>
        <p className={`mt-2 max-w-xl text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{profile.description}</p>
        <p className={`mt-3 inline-flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}><Globe className="h-3.5 w-3.5" /> {profile.domain}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => { const Icon = stat.icon; return (
          <div key={stat.label} className={`rounded-2xl border p-5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center justify-between"><span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</span><Icon className="h-4 w-4 text-emerald-500" /></div>
            <div className="mt-3 text-2xl font-bold">{stat.value}</div>
          </div>
        ); })}
      </div>

      <div className={`mt-6 rounded-2xl border p-6 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
        <h2 className="text-lg font-bold">Services</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Manage each part of this startup.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => { const Icon = service.icon; return (
            <Link key={service.path} to={`/s/${startupId}/${service.path}`} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-emerald-400/50 ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600"><Icon className="h-4 w-4" /></span>
              {service.label}
              <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" />
            </Link>
          ); })}
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
