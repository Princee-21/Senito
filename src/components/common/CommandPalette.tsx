import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Layers,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Settings,
  Plus,
  ArrowRight,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { StoreService } from '../../services/store';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onOpenBuilder: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBuilder,
}) => {
  const [query, setQuery] = useState('');
  const surveys = StoreService.getSurveys();
  const issues = StoreService.getIssues();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Create New Survey Campaign', icon: Plus, action: () => { onClose(); onOpenBuilder(); } },
    { label: 'Go to Overview Dashboard', icon: Layers, action: () => { onClose(); onNavigate('overview'); } },
    { label: 'Open Issue Radar & Actions', icon: AlertTriangle, action: () => { onClose(); onNavigate('radar'); } },
    { label: 'Track Before vs After Improvements', icon: TrendingUp, action: () => { onClose(); onNavigate('improvements'); } },
    { label: 'View Analytics & Export CSV', icon: BarChart3, action: () => { onClose(); onNavigate('analytics'); } },
    { label: 'Workspace & Organization Settings', icon: Settings, action: () => { onClose(); onNavigate('settings'); } },
    { label: 'View Security Audit Logs', icon: Shield, action: () => { onClose(); onNavigate('audit'); } },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSurveys = surveys.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.industry.toLowerCase().includes(query.toLowerCase())
  );

  const filteredIssues = issues.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="w-full max-w-xl rounded-3xl bg-[#121319] border border-white/[0.12] shadow-2xl overflow-hidden text-[#E1E0CC]"
        >
          {/* Search bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08]">
            <Search className="w-4 h-4 text-white/40 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search campaigns, issues, metrics, or jump to tabs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-mono text-[#E1E0CC] placeholder:text-white/30 selection:bg-[#DEDBC8] selection:text-black"
            />
            <span className="text-[10px] font-mono text-white/30 px-1.5 py-0.5 rounded border border-white/[0.08] ml-2">
              ESC
            </span>
          </div>

          {/* Quick List */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-4">
            {/* Quick Actions */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/50 px-2.5 block mb-1.5">
                Quick Actions
              </span>
              <div className="space-y-1">
                {filteredActions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full p-2.5 rounded-xl hover:bg-white/[0.05] flex items-center justify-between text-left text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#DEDBC8] group-hover:scale-110 transition-transform" />
                        <span className="text-[#E1E0CC] font-medium">{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matching Surveys */}
            {filteredSurveys.length > 0 && query && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/50 px-2.5 block mb-1.5">
                  Surveys
                </span>
                <div className="space-y-1">
                  {filteredSurveys.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onClose();
                        onNavigate('surveys');
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-white/[0.05] flex items-center justify-between text-left text-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#DEDBC8]/60 bg-white/[0.04] px-1.5 py-0.5 rounded">
                          {s.industry}
                        </span>
                        <span className="text-[#E1E0CC]">{s.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">★ {s.averageRating}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Issues */}
            {filteredIssues.length > 0 && query && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/50 px-2.5 block mb-1.5">
                  Issues on Radar
                </span>
                <div className="space-y-1">
                  {filteredIssues.map((i) => (
                    <button
                      key={i.id}
                      onClick={() => {
                        onClose();
                        onNavigate('radar');
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-white/[0.05] flex items-center justify-between text-left text-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {i.severity}
                        </span>
                        <span className="text-[#E1E0CC]">{i.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#DEDBC8]/50">{i.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
