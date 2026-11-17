import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  LayoutDashboard, User, Bell,
  Shield, HelpCircle, LogOut, Cloud,
  LineChart, Users, Key, Globe, Database,
  ChevronUp, Settings, FileText, CreditCard,
  PanelLeftClose, PanelLeft, Minimize2,
  Check, Sun, Moon, Monitor
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider, useSidebar } from './SidebarContext';
import { SidebarItem } from './SidebarItem';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from '../../services/auth.service';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 w-full px-3 py-2 text-[13px]
          transition-colors duration-150
          ${isDark
            ? 'text-gray-400 hover:bg-white/5 hover:text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }
        `}
      >
        {isDark ? <Moon className="w-4 h-4 shrink-0" /> : <Sun className="w-4 h-4 shrink-0" />}
        <span>Theme</span>
        <span className={`ml-auto text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System'}
        </span>
      </button>

      {open && (
        <div
          className={`
            absolute bottom-full left-0 right-0 mb-1 rounded-lg overflow-hidden
            shadow-2xl z-50
            ${isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white border border-gray-200'}
          `}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTheme(opt.value);
                setOpen(false);
              }}
              className={`
                flex items-center gap-2 w-full px-3 py-2 text-[13px]
                transition-colors duration-150
                ${theme === opt.value
                  ? isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                  : isDark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <opt.icon className="w-4 h-4 shrink-0" />
              <span>{opt.label}</span>
              {theme === opt.value && <Check className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ModeButton = () => {
  const { mode, cycleMode, isExpanded } = useSidebar();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const modes = {
    collapsed: { label: 'Always collapsed', icon: Minimize2 },
    auto: { label: 'Expand on hover', icon: PanelLeft },
    expanded: { label: 'Always expanded', icon: PanelLeftClose },
  } as const;

  const currentMode = modes[mode];
  const CurrentIcon = currentMode.icon;

  return (
    <div className="mx-2 my-1">
      <button
        onClick={cycleMode}
        className={`
          flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[12px]
          transition-colors duration-150
          ${isDark
            ? 'text-gray-400 hover:text-white hover:bg-white/10 bg-white/5'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 bg-gray-100/60'
          }
        `}
        title={`${currentMode.label} (click to change)`}
      >
        <CurrentIcon className="w-4 h-4 shrink-0" />
        <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-150 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
          {currentMode.label}
        </span>
      </button>
    </div>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ bottom: number; left: number }>({ bottom: 0, left: 0 });

  useLayoutEffect(() => {
    if (isUserMenuOpen && userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect();
      setMenuPos({ bottom: window.innerHeight - rect.top + 8, left: rect.left });
    }
  }, [isUserMenuOpen]);

  const userData = (() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  const username = userData?.username || userData?.name || localStorage.getItem('username') || 'User';
  const email = userData?.email || localStorage.getItem('email') || 'user@example.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inButton = userButtonRef.current?.contains(target);
      const inMenu = userMenuRef.current?.contains(target);
      if (!inButton && !inMenu) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleScroll = () => setIsUserMenuOpen(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Cloud, label: 'Deploy', to: '/deploy' },
    { icon: LineChart, label: '7EA Stock', to: '/stock' },
    { icon: Users, label: 'Waitlist', to: '/waitlist' },
    { icon: Key, label: 'Authority', to: '/authority' },
    { icon: Globe, label: 'UniverseX', to: '/universe' },
    { icon: Database, label: 'DataHub', to: '/datahub' },
  ];

  const userMenuItems = [
    { icon: User, label: 'Account', to: '/account' },
    { icon: CreditCard, label: 'Billing', to: '/billing' },
    { icon: Settings, label: 'Preferences', to: '/settings' },
    { icon: Shield, label: 'Security', to: '/security' },
    { icon: Bell, label: 'Notifications', to: '/notifications' },
    { icon: FileText, label: 'Documentation', to: '/documentation' },
    { icon: HelpCircle, label: 'Help Center', to: '/help' },
  ];

  return (
    <SidebarProvider>
      {({ isExpanded, handleMouseEnter, handleMouseLeave, showTooltips, toggleTooltips }) => (
        <aside
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            sticky top-0 h-screen flex flex-col z-40 overflow-visible
            transition-[width] duration-200 ease-in-out
            ${isExpanded ? 'w-60' : 'w-[68px]'}
          `}
        >
          {/* Logo area */}
          <div className={`flex items-center h-16 mt-2 shrink-0 ${isExpanded ? 'px-3 mx-2' : 'px-0 mx-0'}`}>
            <div className={`flex items-center gap-3 w-full ${isExpanded ? '' : 'justify-center'}`}>
              <img
                src="https://idealfrank.sirv.com/famx_logo_final.png"
                alt="Logo"
                className={`shrink-0 object-contain transition-all duration-200 ${isExpanded ? 'h-5 w-auto' : 'h-auto w-12'}`}
              />
              <span className={`
                text-sm font-semibold whitespace-nowrap overflow-hidden
                transition-opacity duration-150
                ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                CloudPlatform
              </span>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 py-3 px-2 overflow-visible">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarItem
                  key={item.to}
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                />
              ))}
            </div>
          </nav>

          {/* Bottom section */}
          <div className="px-2 pb-3 shrink-0">
            {/* User menu */}
            <div className="relative">
              <button
                ref={userButtonRef}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2.5 rounded-xl
                  transition-colors duration-150
                  ${isUserMenuOpen
                    ? isDark ? 'bg-white/10' : 'bg-gray-200'
                    : isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                {!isExpanded && (
                  <span className={`text-[13px] font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {username.charAt(0).toUpperCase()}
                  </span>
                )}

                <div className={`
                  flex-1 text-left overflow-hidden min-w-0
                  transition-opacity duration-150
                  ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}
                `}>
                  <p className={`text-[13px] font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {username}
                  </p>
                  <p className={`text-[11px] truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {email}
                  </p>
                </div>

                {isExpanded && (
                  <ChevronUp className={`
                    w-4 h-4 transition-transform duration-200 shrink-0
                    ${isUserMenuOpen ? 'rotate-180' : ''}
                    ${isDark ? 'text-gray-400' : 'text-gray-400'}
                  `} />
                )}
              </button>

              {/* Dropdown menu - rendered via portal to escape sidebar overflow clipping */}
              {isUserMenuOpen && createPortal(
                <div
                  ref={userMenuRef}
                  className={`fixed rounded-xl shadow-2xl z-[100] w-56 ${isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white border border-gray-200'}`}
                  style={{ bottom: menuPos.bottom, left: menuPos.left }}
                >
                  <div className={`px-3 py-2.5 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{username}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{email}</p>
                  </div>

                  <div className="py-1.5">
                    {userMenuItems.map((item) => (
                      <button
                        key={item.to}
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate(item.to);
                        }}
                        className={`
                          flex items-center gap-2 w-full px-3 py-2 text-[13px]
                          transition-colors duration-150
                          ${location.pathname === item.to
                            ? isDark
                              ? 'bg-white/10 text-white'
                              : 'bg-gray-100 text-gray-900'
                            : isDark
                              ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <button
                      onClick={toggleTooltips}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-[13px] transition-colors ${
                        isDark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <PanelLeft className="w-4 h-4" />
                      <span>Collapsed labels</span>
                      <span className={`ml-auto text-[11px] ${showTooltips ? 'text-emerald-600' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {showTooltips ? 'On' : 'Off'}
                      </span>
                    </button>
                    <ThemeToggle />
                  </div>

                  <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <button
                      onClick={handleLogout}
                      className={`
                        flex items-center gap-2 w-full px-3 py-2 text-[13px]
                        transition-colors duration-150
                        ${isDark
                          ? 'text-red-400 hover:bg-white/5'
                          : 'text-red-600 hover:bg-red-50'
                        }
                      `}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>,
                document.body
              )}
            </div>

            {/* Sidebar mode toggle */}
            <ModeButton />
          </div>
        </aside>
      )}
    </SidebarProvider>
  );
};
