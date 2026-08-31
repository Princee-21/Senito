import React, { useState } from 'react';
import { ArrowUpRight, Activity, LogIn, LogOut, Menu, X, Sparkles, Shield, Layers, HelpCircle } from 'lucide-react';
import { AuthUser } from '../../services/store';

interface LandingNavProps {
  currentUser?: AuthUser | null;
  onEnterApp: (tab?: string) => void;
  onExploreDemo: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({
  currentUser,
  onEnterApp,
  onExploreDemo,
  onSignIn,
  onSignUp,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', href: '#overview' },
    { label: 'How It Works', href: '#lifecycle' },
    { label: 'Features', href: '#features' },
    { label: 'Issue Radar', href: '#radar' },
  ];

  return (
    <header
      id="landing-header"
      className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-5 md:px-6 py-2.5 sm:py-3.5 md:py-4 transition-all duration-300 backdrop-blur-md bg-black/60 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#DEDBC8] text-black flex items-center justify-center font-bold text-xs sm:text-sm tracking-tighter shadow-lg shadow-[#DEDBC8]/10 shrink-0">
            S
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 shrink-0">
            <span className="font-extrabold tracking-widest text-sm sm:text-base md:text-lg text-[#E1E0CC]">
              SENTIO
            </span>
            <span className="hidden sm:inline-block text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#DEDBC8]/60 px-1 sm:px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
              Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Links (Visible only on xl and large screens to prevent tablet overflow) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-xs font-mono tracking-wider uppercase text-[#DEDBC8]/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#DEDBC8] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onExploreDemo}
            className="hover:text-[#DEDBC8] text-[#DEDBC8] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Demo</span>
          </button>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {currentUser ? (
            <>
              <button
                id="nav-enter-app-btn"
                onClick={() => {
                  onEnterApp('overview');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-black bg-[#DEDBC8] hover:bg-[#E8E5D5] font-semibold rounded-full shadow-md shadow-[#DEDBC8]/15 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline sm:inline">Go to Workspace</span>
                <span className="xs:hidden sm:hidden">Workspace</span>
              </button>
              <button
                onClick={onSignOut}
                title={`Signed in as ${currentUser.email} • Click to Sign Out`}
                className="p-1.5 sm:p-2 rounded-full text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                id="nav-signin-btn"
                onClick={() => {
                  onSignIn();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#DEDBC8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DEDBC8]" />
                <span>Sign In</span>
              </button>
              <button
                id="nav-signup-btn"
                onClick={() => {
                  onSignUp();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-black bg-[#DEDBC8] hover:bg-[#E8E5D5] font-semibold rounded-full shadow-md shadow-[#DEDBC8]/15 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Sign Up</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </>
          )}

          {/* Mobile / Tablet Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2.5 text-xs font-mono tracking-wider uppercase text-[#DEDBC8]/80 bg-black/95 rounded-2xl p-4 shadow-2xl border border-white/[0.05] animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/[0.05] hover:text-[#DEDBC8] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
          ))}
          <button
            onClick={() => {
              onExploreDemo();
              setMobileMenuOpen(false);
            }}
            className="px-3 py-2 text-left rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Explore Live Demo</span>
            </div>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>
        </div>
      )}
    </header>
  );
};
