import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Layers,
  Star,
  Smile,
  Hash,
  ListOrdered,
  CheckSquare,
  ToggleLeft,
  AlignLeft,
  FileText,
  Sliders,
  QrCode,
  Smartphone,
  Monitor,
  Save,
  CheckCircle,
  HelpCircle,
  Wand2,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import { Survey, Question, QuestionType, IndustryType, SurveyTemplate } from '../../types';
import { StoreService } from '../../services/store';
import { IntelligenceService } from '../../services/intelligence';
import { PublicSurveyRunner } from '../public-survey/PublicSurveyRunner';
import { TemplatesModal } from './TemplatesModal';
import { QrShareModal } from '../share/QrShareModal';
import { useToast } from '../common/Toast';

interface SurveyBuilderProps {
  initialSurvey?: Survey | null;
  onSaveComplete?: (survey: Survey) => void;
  onCancel?: () => void;
}

const QUESTION_TYPE_ITEMS: Array<{
  type: QuestionType;
  label: string;
  icon: any;
  category: string;
}> = [
  { type: 'star_rating', label: 'Star Rating (1-5)', icon: Star, category: 'Ratings' },
  { type: 'emoji_mood', label: 'Emoji Mood (5-pt)', icon: Smile, category: 'Ratings' },
  { type: 'nps', label: 'NPS Score (0-10)', icon: ListOrdered, category: 'Ratings' },
  { type: 'numeric_rating', label: 'Numeric Scale (1-7/10)', icon: Hash, category: 'Ratings' },
  { type: 'likert_scale', label: 'Likert Scale (1-5 Agree)', icon: Sliders, category: 'Ratings' },
  { type: 'multiple_choice', label: 'Single Choice', icon: Layers, category: 'Choices' },
  { type: 'checkbox', label: 'Multiple Checkboxes', icon: CheckSquare, category: 'Choices' },
  { type: 'yes_no', label: 'Yes / No Toggle', icon: ToggleLeft, category: 'Choices' },
  { type: 'dropdown', label: 'Dropdown Select', icon: ListOrdered, category: 'Choices' },
  { type: 'short_text', label: 'Short Text Input', icon: AlignLeft, category: 'Text' },
  { type: 'long_text', label: 'Long Text Area', icon: FileText, category: 'Text' },
];

export const SurveyBuilder: React.FC<SurveyBuilderProps> = ({
  initialSurvey,
  onSaveComplete,
  onCancel,
}) => {
  const { showToast } = useToast();
  const settings = StoreService.getSettings();

  const [title, setTitle] = useState(initialSurvey?.title || 'New Experience Evaluation');
  const [description, setDescription] = useState(
    initialSurvey?.description || 'Gathering constructive feedback to drive continuous improvement.'
  );
  const [category, setCategory] = useState(initialSurvey?.category || 'Customer Experience');
  const [industry, setIndustry] = useState<IndustryType>(initialSurvey?.industry || settings.industry);
  const [allowAnonymous, setAllowAnonymous] = useState(initialSurvey?.allowAnonymous ?? true);

  const [questions, setQuestions] = useState<Question[]>(
    initialSurvey?.questions || [
      {
        id: 'q-1',
        type: 'emoji_mood',
        title: 'How was your overall experience today?',
        description: 'Select the mood that best reflects your impression.',
        required: true,
        category: 'Satisfaction',
        order: 1,
      },
      {
        id: 'q-2',
        type: 'star_rating',
        title: 'How would you rate the speed and quality of our service?',
        required: true,
        category: 'Quality',
        minRating: 1,
        maxRating: 5,
        order: 2,
      },
      {
        id: 'q-3',
        type: 'long_text',
        title: 'What could we improve for next time?',
        required: false,
        category: 'Suggestions',
        conditionalRules: [
          {
            id: 'cr-1',
            dependsOnQuestionId: 'q-2',
            operator: 'less_than_or_equal',
            value: 3,
            action: 'show',
          },
        ],
        order: 3,
      },
    ]
  );

  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(questions[0]?.id || null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [savedSurvey, setSavedSurvey] = useState<Survey | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Construct draft survey object for live simulator
  const liveSurveyDraft: Survey = {
    id: initialSurvey?.id || 'srv-draft-sim',
    title: title || 'Untitled Survey',
    description,
    category,
    industry,
    status: 'published',
    questions,
    createdAt: initialSurvey?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    allowAnonymous,
    totalResponses: initialSurvey?.totalResponses || 0,
    averageRating: initialSurvey?.averageRating || 4.5,
    feedbackPulseScore: initialSurvey?.feedbackPulseScore || 85,
    slug: 'live-draft',
  };

  // Add Question by Type
  const handleAddQuestion = (type: QuestionType) => {
    const newId = `q-${Date.now().toString().slice(-5)}`;
    let defaultOptions: any = undefined;

    if (['multiple_choice', 'checkbox', 'dropdown'].includes(type)) {
      defaultOptions = [
        { id: `opt-${Date.now()}-1`, label: 'Option 1', value: 'opt_1' },
        { id: `opt-${Date.now()}-2`, label: 'Option 2', value: 'opt_2' },
        { id: `opt-${Date.now()}-3`, label: 'Option 3', value: 'opt_3' },
      ];
    }

    const newQ: Question = {
      id: newId,
      type,
      title: `New ${type.replace(/_/g, ' ')} question`,
      required: true,
      category: 'General',
      minRating: type === 'star_rating' ? 1 : type === 'nps' ? 0 : 1,
      maxRating: type === 'star_rating' ? 5 : type === 'nps' ? 10 : 7,
      options: defaultOptions,
      order: questions.length + 1,
    };

    setQuestions((prev) => [...prev, newQ]);
    setActiveQuestionId(newId);
    showToast('Question Added', `Added ${type.replace(/_/g, ' ')} question.`, 'info');
  };

  // Move Question
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === questions.length - 1)) return;
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    copy.forEach((q, i) => (q.order = i + 1));
    setQuestions(copy);
  };

  // Duplicate Question
  const handleDuplicateQuestion = (q: Question) => {
    const newId = `q-${Date.now().toString().slice(-5)}`;
    const copy: Question = {
      ...q,
      id: newId,
      title: `${q.title} (Copy)`,
      order: questions.length + 1,
    };
    setQuestions((prev) => [...prev, copy]);
    setActiveQuestionId(newId);
    showToast('Question Duplicated', undefined, 'info');
  };

  // Delete Question
  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showToast('Cannot Delete', 'A survey must contain at least one question.', 'warning');
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (activeQuestionId === id) {
      setActiveQuestionId(questions[0]?.id || null);
    }
  };

  // Update Question Field
  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  // AI Question Generator
  const handleGenerateAiQuestions = () => {
    if (!aiTopicInput.trim()) {
      showToast('Enter Topic', 'Type a topic like "Hospitality", "Onboarding", or "Product UX".', 'warning');
      return;
    }

    setIsGeneratingAi(true);
    setTimeout(() => {
      const generated = IntelligenceService.generateQuestionsForTopic(aiTopicInput);
      const newQuestions: Question[] = generated.map((g, i) => ({
        ...g,
        id: `q-ai-${Date.now()}-${i}`,
        order: questions.length + i + 1,
      }));

      setQuestions((prev) => [...prev, ...newQuestions]);
      setIsGeneratingAi(false);
      setAiTopicInput('');
      showToast('AI Questions Generated', `Appended ${newQuestions.length} tailored questions for "${aiTopicInput}".`, 'success');
    }, 600);
  };

  // Load Template
  const handleSelectTemplate = (template: SurveyTemplate) => {
    setTitle(template.title);
    setDescription(template.description);
    setCategory(template.category);
    setIndustry(template.industry);

    const loadedQuestions: Question[] = template.questions.map((q, idx) => ({
      ...q,
      id: `q-${Date.now()}-${idx}`,
      order: idx + 1,
    }));

    setQuestions(loadedQuestions);
    setActiveQuestionId(loadedQuestions[0]?.id || null);
    showToast('Template Loaded', `Loaded "${template.title}".`, 'success');
  };

  // Save Survey
  const handleSave = (status: 'draft' | 'published') => {
    if (!title.trim()) {
      showToast('Missing Title', 'Please provide a survey title.', 'warning');
      return;
    }

    const saved = StoreService.saveSurvey({
      id: initialSurvey?.id,
      title,
      description,
      category,
      industry,
      status,
      allowAnonymous,
      questions,
    });

    setSavedSurvey(saved);
    showToast(
      status === 'published' ? 'Survey Published' : 'Draft Saved',
      `"${saved.title}" is ready for collection.`,
      'success'
    );

    if (status === 'published') {
      setIsQrModalOpen(true);
    }

    if (onSaveComplete) {
      onSaveComplete(saved);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#E1E0CC] flex flex-col selection:bg-[#DEDBC8] selection:text-black">
      {/* Top Action Bar */}
      <header className="h-16 px-6 border-b border-white/[0.08] bg-[#0c0d12] flex items-center justify-between shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs font-mono text-[#DEDBC8]/60 hover:text-[#DEDBC8] transition-colors cursor-pointer"
            >
              ← Back
            </button>
          )}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/50 block">
              Adaptive Survey Builder
            </span>
            <h1 className="text-sm sm:text-base font-bold text-[#E1E0CC] truncate max-w-sm">
              {title || 'Untitled Survey'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTemplatesOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#DEDBC8] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => handleSave('draft')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#E1E0CC] transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('published')}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-[#DEDBC8]/15 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Publish & Share</span>
          </button>
        </div>
      </header>

      {/* 3-Column Studio Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ========================================================================= */}
        {/* COLUMN 1: Question Types Palette & AI Generator (3 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 border-r border-white/[0.08] bg-[#0c0d13] p-5 overflow-y-auto space-y-6">
          {/* AI Generator Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#DEDBC8]/10 to-transparent border border-[#DEDBC8]/20">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="w-4 h-4 text-[#DEDBC8]" />
              <span className="text-xs font-bold text-[#E1E0CC]">AI Question Synthesizer</span>
            </div>
            <p className="text-[11px] text-[#DEDBC8]/70 leading-relaxed mb-3">
              Describe your objective to automatically generate tailored questions.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Dining Experience..."
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateAiQuestions()}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC] placeholder:text-white/30 focus:outline-none focus:border-[#DEDBC8]"
              />
              <button
                onClick={handleGenerateAiQuestions}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-xl bg-[#DEDBC8] text-black text-xs font-bold shrink-0 hover:bg-[#E8E5D5] transition-colors cursor-pointer"
              >
                {isGeneratingAi ? '...' : 'Add'}
              </button>
            </div>
          </div>

          {/* Palette Categories */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#DEDBC8]/50 block mb-3">
              Available Question Types (11)
            </span>
            <div className="space-y-1.5">
              {QUESTION_TYPE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onClick={() => handleAddQuestion(item.type)}
                    className="w-full p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#DEDBC8]/30 flex items-center justify-between text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1.5 rounded-lg bg-white/[0.04] text-[#DEDBC8] group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs text-[#E1E0CC] group-hover:text-white font-medium">
                        {item.label}
                      </span>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-white/30 group-hover:text-[#DEDBC8] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2: Center Canvas & Question Card Editor (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 p-6 overflow-y-auto space-y-6 bg-[#090a0e]">
          {/* Survey Metadata Card */}
          <div className="p-6 rounded-2xl bg-[#111218] border border-white/[0.08] space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-1.5">
                Campaign Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg font-bold text-[#E1E0CC] bg-transparent border-b border-white/[0.12] pb-1 focus:outline-none focus:border-[#DEDBC8]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-1.5">
                Description / Purpose
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs text-[#DEDBC8]/80 bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 focus:outline-none focus:border-[#DEDBC8] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-1.5">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as IndustryType)}
                  className="w-full text-xs bg-[#161720] border border-white/[0.08] rounded-xl p-2 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                >
                  <option value="Technology & SaaS">Technology & SaaS</option>
                  <option value="Hospitality & Restaurant">Hospitality & Restaurant</option>
                  <option value="Hotel & Travel">Hotel & Travel</option>
                  <option value="Higher Education & Academics">Higher Education & Academics</option>
                  <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                  <option value="Retail & E-commerce">Retail & E-commerce</option>
                  <option value="Fitness & Recreation">Fitness & Recreation</option>
                  <option value="Events & Entertainment">Events & Entertainment</option>
                  <option value="General Business">General Business</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs bg-[#161720] border border-white/[0.08] rounded-xl p-2 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#DEDBC8]/70">Allow Anonymous Feedback</span>
              <input
                type="checkbox"
                checked={allowAnonymous}
                onChange={(e) => setAllowAnonymous(e.target.checked)}
                className="w-4 h-4 rounded accent-[#DEDBC8] cursor-pointer"
              />
            </div>
          </div>

          {/* Question List Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
                Questions ({questions.length})
              </span>
              <span className="text-[11px] font-mono text-[#DEDBC8]/40">Drag or use arrows to reorder</span>
            </div>

            {questions.map((q, index) => {
              const isActive = activeQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#13141b] border-[#DEDBC8]/40 shadow-xl shadow-black/60'
                      : 'bg-[#0f1016] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#DEDBC8]/10 text-[#DEDBC8] font-mono text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#DEDBC8]/60 bg-white/[0.04] px-2 py-0.5 rounded">
                        {q.type.replace(/_/g, ' ')}
                      </span>
                      {q.conditionalRules && q.conditionalRules.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <GitBranch className="w-2.5 h-2.5" />
                          <span>Branching</span>
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleMoveQuestion(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-white/40 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveQuestion(index, 'down')}
                        disabled={index === questions.length - 1}
                        className="p-1 text-white/40 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateQuestion(q)}
                        className="p-1 text-white/40 hover:text-[#DEDBC8] cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1 text-white/40 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Title Edit */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={q.title}
                      onChange={(e) => handleUpdateQuestion(q.id, { title: e.target.value })}
                      placeholder="Enter question prompt..."
                      className="w-full text-sm font-semibold text-[#E1E0CC] bg-transparent border-b border-white/[0.08] pb-1 focus:outline-none focus:border-[#DEDBC8]"
                    />
                  </div>

                  {/* Question Description Edit */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={q.description || ''}
                      onChange={(e) => handleUpdateQuestion(q.id, { description: e.target.value })}
                      placeholder="Optional helper text or instructions..."
                      className="w-full text-xs text-[#DEDBC8]/60 bg-transparent border-none outline-none"
                    />
                  </div>

                  {/* Options Manager for choice-based questions */}
                  {['multiple_choice', 'checkbox', 'dropdown'].includes(q.type) && (
                    <div className="space-y-2 mb-4 p-3 rounded-xl bg-black/20 border border-white/[0.04]">
                      <span className="text-[10px] font-mono text-[#DEDBC8]/50 uppercase tracking-wider block">
                        Choice Options
                      </span>
                      {(q.options || []).map((opt, optIdx) => (
                        <div key={opt.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={opt.label}
                            onChange={(e) => {
                              const newOpts = [...(q.options || [])];
                              newOpts[optIdx] = { ...newOpts[optIdx], label: e.target.value, value: e.target.value };
                              handleUpdateQuestion(q.id, { options: newOpts });
                            }}
                            className="flex-1 text-xs bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1 text-[#E1E0CC]"
                          />
                          <button
                            onClick={() => {
                              const newOpts = (q.options || []).filter((_, i) => i !== optIdx);
                              handleUpdateQuestion(q.id, { options: newOpts });
                            }}
                            className="text-white/30 hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newOpts = [
                            ...(q.options || []),
                            { id: `opt-${Date.now()}`, label: `Option ${(q.options?.length || 0) + 1}`, value: `opt_${Date.now()}` },
                          ];
                          handleUpdateQuestion(q.id, { options: newOpts });
                        }}
                        className="text-[11px] font-mono text-[#DEDBC8] hover:underline pt-1 block cursor-pointer"
                      >
                        + Add Choice Option
                      </button>
                    </div>
                  )}

                  {/* Conditional Logic Branching Configurator */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-mono text-[#DEDBC8]/70 flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={q.required}
                          onChange={(e) => handleUpdateQuestion(q.id, { required: e.target.checked })}
                          className="rounded accent-[#DEDBC8]"
                        />
                        <span>Required</span>
                      </label>
                    </div>

                    {/* Conditional Logic Toggle Button */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (q.conditionalRules && q.conditionalRules.length > 0) {
                            handleUpdateQuestion(q.id, { conditionalRules: [] });
                          } else {
                            handleUpdateQuestion(q.id, {
                              conditionalRules: [
                                {
                                  id: `cr-${Date.now()}`,
                                  dependsOnQuestionId: questions[index - 1].id,
                                  operator: 'less_than_or_equal',
                                  value: 3,
                                  action: 'show',
                                },
                              ],
                            });
                          }
                        }}
                        className="text-[11px] font-mono text-[#DEDBC8]/60 hover:text-[#DEDBC8] flex items-center gap-1 cursor-pointer"
                      >
                        <GitBranch className="w-3 h-3" />
                        <span>{q.conditionalRules?.length ? 'Rule Configured' : '+ Add Logic Rule'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3: Real-Time Respondent Simulator (4 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 border-l border-white/[0.08] bg-[#0b0c10] p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top Device Switcher */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
                Live Simulator
              </span>

              <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-[#DEDBC8] text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-[#DEDBC8] text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Frame */}
            <div
              className={`mx-auto rounded-3xl border border-white/[0.12] bg-[#0c0d12] overflow-hidden shadow-2xl transition-all ${
                previewDevice === 'mobile' ? 'max-w-[340px] min-h-[560px]' : 'w-full min-h-[500px]'
              }`}
            >
              <PublicSurveyRunner survey={liveSurveyDraft} isSimulator={true} />
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[11px] font-mono text-[#DEDBC8]/40">
              Interactive preview responds instantly to editor changes.
            </span>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* QR Share Modal */}
      <QrShareModal
        survey={savedSurvey}
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onTestSurvey={(srv) => {
          setIsQrModalOpen(false);
        }}
      />
    </div>
  );
};
