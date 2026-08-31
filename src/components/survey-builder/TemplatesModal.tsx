import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Utensils,
  BedDouble,
  Layers,
  Users,
  Ticket,
  GraduationCap,
  HeartPulse,
  Activity,
  ShoppingBag,
  ArrowRight,
  Search,
} from 'lucide-react';
import { INITIAL_TEMPLATES } from '../../services/store';
import { SurveyTemplate, IndustryType } from '../../types';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: SurveyTemplate) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Utensils,
  BedDouble,
  Layers,
  Users,
  Ticket,
  GraduationCap,
  HeartPulse,
  Activity,
  ShoppingBag,
};

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const industries = ['All', 'Technology & SaaS', 'Hospitality & Restaurant', 'Hotel & Travel', 'Higher Education & Academics', 'Healthcare & Wellness', 'Retail & E-commerce', 'Events & Entertainment', 'General Business'];

  const filteredTemplates = INITIAL_TEMPLATES.filter((t) => {
    const matchesIndustry = selectedIndustry === 'All' || t.industry === selectedIndustry;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-[#111218] border border-white/[0.12] text-[#E1E0CC] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#DEDBC8]/70 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8]" />
                <span>Multi-Industry Templates</span>
              </div>
              <h2 className="text-2xl font-bold text-[#E1E0CC]">Choose a Pre-Engineered Survey</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-6 border-b border-white/[0.06] flex flex-col sm:flex-row gap-4 shrink-0 bg-[#0e0f14]">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates (e.g. restaurant, customer, event, clinic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#E1E0CC] placeholder:text-white/30 focus:outline-none focus:border-[#DEDBC8]/50"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {industries.slice(0, 5).map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    selectedIndustry === ind
                      ? 'bg-[#DEDBC8] text-black font-semibold'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-[#DEDBC8]/70'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = iconMap[template.iconName] || Sparkles;
              return (
                <div
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template);
                    onClose();
                  }}
                  className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[#DEDBC8]/30 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-xl bg-[#DEDBC8]/10 text-[#DEDBC8] group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-[#DEDBC8]/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                        {template.industry}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#E1E0CC] group-hover:text-[#DEDBC8] transition-colors mb-1.5">
                      {template.title}
                    </h3>
                    <p className="text-xs text-[#DEDBC8]/60 leading-relaxed mb-4">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#DEDBC8]/40">
                      {template.questions.length} Pre-configured questions
                    </span>
                    <span className="text-xs font-mono text-[#DEDBC8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Use template <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
