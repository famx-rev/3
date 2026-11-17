import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface StartupService {
  title: string;
  description: string;
  ready: boolean;
}

interface Props {
  heading: string;
  description: string;
  services: StartupService[];
  action?: string;
}

export const StartupServicePage = ({ heading, description, services, action = 'Set up' }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const badge = (ready: boolean) => ready ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600';

  return (
    <div>
      <div className={`mb-6 rounded-2xl border p-6 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
        <h1 className="text-2xl font-bold">{heading}</h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className={`flex flex-col rounded-2xl border p-5 transition hover:-translate-y-1 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold">{service.title}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${badge(service.ready)}`}>{service.ready ? 'Active' : 'Needs setup'}</span>
            </div>
            <p className={`mt-1 flex-1 text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{service.description}</p>
            <button className={`mt-4 self-start rounded-full px-4 py-2 text-sm font-semibold transition ${service.ready ? (isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200') : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
              {service.ready ? 'Manage' : action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupServicePage;
