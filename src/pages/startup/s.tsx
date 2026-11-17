import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Plus, Search, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Startup {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  accent: string;
  initials: string;
  users: string;
}

const startups: Startup[] = [
  { id: 'northstar-ai', name: 'Northstar AI', tagline: 'Turn complex operations into clear next steps.', domain: 'northstar.ai', accent: 'from-emerald-400 to-teal-600', initials: 'N', users: '2.4k' },
  { id: 'orbit-health', name: 'Orbit Health', tagline: 'Make everyday care easier to navigate.', domain: 'orbit.health', accent: 'from-sky-400 to-blue-600', initials: 'O', users: '1.8k' },
  { id: 'pixel-forge', name: 'Pixel Forge', tagline: 'Ship beautiful product experiences faster.', domain: 'pixelforge.dev', accent: 'from-amber-400 to-orange-600', initials: 'P', users: '5.1k' },
];

export const StartupDirectory = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => startups.filter((s) => `${s.name} ${s.tagline} ${s.domain}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Startups</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Select a startup to open its workspace.</p>
        </div>
        <button className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-95"><Plus className="h-4 w-4" /> New startup</button>
      </div>

      <div className={`relative mb-6 rounded-xl border ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white'}`}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search startups..." className={`w-full bg-transparent py-3 pl-10 pr-4 text-sm outline-none ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-950 placeholder:text-slate-400'}`} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((startup) => (
          <Link key={startup.id} to={`/s/${startup.id}`} className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/50 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'}`}>
            <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${startup.accent}`} />
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-lg ${startup.accent}`}>{startup.initials}</div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{startup.name}</h3>
                <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{startup.tagline}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-emerald-500 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className={`my-4 h-px ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className={`inline-flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}><Users className="h-3.5 w-3.5" /> {startup.users} users</span>
              <span className="font-semibold text-emerald-600">Open <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
          <p className="font-semibold">No startups found</p>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Try another name.</p>
        </div>
      )}
    </div>
  );
};

export default StartupDirectory;
