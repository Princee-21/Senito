import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Smile,
  X,
  RotateCcw,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Survey, Question, Answer, SurveyResponse } from '../../types';
import { StoreService } from '../../services/store';
import { IntelligenceService } from '../../services/intelligence';
import { useToast } from '../common/Toast';

interface PublicSurveyRunnerProps {
  survey?: Survey | null;
  onClose?: () => void;
  onResponseSubmitted?: (response: SurveyResponse) => void;
  isSimulator?: boolean;
}

export const PublicSurveyRunner: React.FC<PublicSurveyRunnerProps> = ({
  survey,
  onClose,
  onResponseSubmitted,
  isSimulator = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [respondentName, setRespondentName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  if (!survey) {
    return (
      <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 bg-[#090a0f] text-[#E1E0CC] text-center safe-top safe-bottom">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#121319] border border-white/[0.08] shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#E1E0CC]">Survey Link Not Found</h2>
            <p className="text-xs text-[#DEDBC8]/70 leading-relaxed">
              This survey may have expired, been updated, or the link is incomplete.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
            >
              Return to Sentio
            </button>
          )}
        </div>
      </div>
    );
  }

  // Filter visible questions based on conditional branching logic
  const getVisibleQuestions = (): Question[] => {
    return (survey.questions || []).filter((q) => {
      if (!q.conditionalRules || q.conditionalRules.length === 0) return true;

      return q.conditionalRules.every((rule) => {
        const dependentAnswer = answers[rule.dependsOnQuestionId];
        if (dependentAnswer === undefined) return false;

        let conditionMet = false;
        if (rule.operator === 'equals') conditionMet = String(dependentAnswer) === String(rule.value);
        if (rule.operator === 'not_equals') conditionMet = String(dependentAnswer) !== String(rule.value);
        if (rule.operator === 'less_than_or_equal') conditionMet = Number(dependentAnswer) <= Number(rule.value);
        if (rule.operator === 'greater_than_or_equal') conditionMet = Number(dependentAnswer) >= Number(rule.value);
        if (rule.operator === 'contains') conditionMet = String(dependentAnswer).includes(String(rule.value));

        return rule.action === 'show' ? conditionMet : !conditionMet;
      });
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentIndex];
  const progressPct = visibleQuestions.length > 0
    ? Math.round(((currentIndex + 1) / visibleQuestions.length) * 100)
    : 100;

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const setAnswerValue = (qId: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleNext = () => {
    if (currentQuestion?.required && (currentAnswer === undefined || currentAnswer === '')) {
      showToast('Required Question', 'Please provide a rating or response to proceed.', 'warning');
      return;
    }

    if (currentIndex < visibleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);

    // Format answers array
    const formattedAnswers: Answer[] = visibleQuestions.map((q) => {
      const val = answers[q.id];
      let numScore: number | undefined = undefined;

      if (typeof val === 'number') numScore = val;
      if (q.type === 'star_rating') numScore = Number(val) || 5;
      if (q.type === 'emoji_mood') numScore = Number(val) || 4;
      if (q.type === 'nps') numScore = Math.round((Number(val) / 10) * 5);
      if (q.type === 'likert_scale') numScore = Number(val);

      return {
        questionId: q.id,
        questionTitle: q.title,
        questionType: q.type,
        value: val !== undefined ? val : '',
        numericScore: numScore,
      };
    });

    // Extract key quote from text questions
    let textFeedback = '';
    formattedAnswers.forEach((a) => {
      if (typeof a.value === 'string' && a.value.length > 5) {
        textFeedback += a.value + ' ';
      }
    });

    const nlpResult = IntelligenceService.analyzeSentiment(textFeedback);

    const newResponse = StoreService.submitResponse({
      surveyId: survey.id,
      surveyTitle: survey.title,
      respondentName: isAnonymous ? undefined : respondentName,
      respondentEmail: isAnonymous ? undefined : respondentEmail,
      isAnonymous,
      answers: formattedAnswers,
      sentiment: nlpResult.sentiment,
      sentimentScore: nlpResult.score,
      keyQuote: textFeedback.trim() ? textFeedback.trim() : undefined,
      detectedTopics: nlpResult.detectedTopics,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#DEDBC8', '#E1E0CC', '#ffffff', '#a8d5b8'],
      });
    } catch (e) {
      // safe fallback
    }

    setSubmitting(false);
    setIsSubmitted(true);
    showToast('Feedback Submitted', 'Thank you for your valuable perspective.', 'success');

    if (onResponseSubmitted) {
      onResponseSubmitted(newResponse);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  const starLabels = ['Very Poor', 'Poor', 'Average', 'Good', 'Exceptional'];

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-between p-4 sm:p-8 md:p-10 bg-[#0a0b0f] text-[#E1E0CC] select-none safe-top safe-bottom">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] max-w-2xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              {survey.industry} • {survey.category}
            </span>
            {isSimulator && (
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#DEDBC8]/10 text-[#DEDBC8]">
                Simulator Mode
              </span>
            )}
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#E1E0CC] truncate max-w-xs sm:max-w-md">
            {survey.title}
          </h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Exit Survey"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Question Body Card */}
      <div className="max-w-2xl mx-auto w-full my-auto py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {!isSubmitted && currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Question Meta */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-[#DEDBC8]">
                    Question {currentIndex + 1} of {visibleQuestions.length}
                  </span>
                  {currentQuestion.required && (
                    <span className="text-[11px] font-mono text-amber-400/80">• Required</span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#E1E0CC] leading-tight">
                  {currentQuestion.title}
                </h3>

                {currentQuestion.description && (
                  <p className="text-xs sm:text-sm text-[#DEDBC8]/60 leading-relaxed">
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              {/* Dynamic Question Inputs */}
              <div className="pt-2">
                {/* 1. STAR RATING */}
                {currentQuestion.type === 'star_rating' && (
                  <div className="flex flex-col items-center justify-center py-6 sm:py-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl">
                    <div className="flex items-center gap-2 sm:gap-4 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (currentAnswer || 0) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setAnswerValue(currentQuestion.id, star)}
                            className="p-2 sm:p-3 transition-transform hover:scale-125 active:scale-95 cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label={`${star} Stars`}
                          >
                            <Star
                              className={`w-9 h-9 sm:w-12 sm:h-12 transition-colors ${
                                isFilled
                                  ? 'fill-[#DEDBC8] text-[#DEDBC8] drop-shadow-md'
                                  : 'text-white/20 hover:text-[#DEDBC8]/60'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-xs sm:text-sm font-mono text-[#DEDBC8] font-medium h-5">
                      {currentAnswer
                        ? `${currentAnswer}/5 — ${starLabels[currentAnswer - 1]}`
                        : 'Tap a star to rate'}
                    </div>
                  </div>
                )}

                {/* 2. EMOJI MOOD */}
                {currentQuestion.type === 'emoji_mood' && (
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 py-3">
                    {[
                      { emoji: '😞', label: 'Terrible', score: 1 },
                      { emoji: '🙁', label: 'Poor', score: 2 },
                      { emoji: '😐', label: 'Okay', score: 3 },
                      { emoji: '🙂', label: 'Good', score: 4 },
                      { emoji: '🤩', label: 'Great', score: 5 },
                    ].map((m) => {
                      const isSelected = currentAnswer === m.score;
                      return (
                        <button
                          key={m.score}
                          type="button"
                          onClick={() => setAnswerValue(currentQuestion.id, m.score)}
                          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer touch-manipulation min-h-[80px] ${
                            isSelected
                              ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] scale-105 shadow-lg'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.07] active:bg-white/[0.1]'
                          }`}
                        >
                          <span className="text-3xl sm:text-4xl mb-1.5">{m.emoji}</span>
                          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-tight truncate w-full text-center">
                            {m.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. NPS (0 - 10) */}
                {currentQuestion.type === 'nps' && (
                  <div className="space-y-3 py-2">
                    {/* Responsive Grid: 6 cols on mobile wrap to 2 rows, 11 cols on desktop */}
                    <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const isSelected = currentAnswer === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setAnswerValue(currentQuestion.id, num)}
                            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer touch-manipulation flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#DEDBC8] text-black scale-105 shadow-md'
                                : 'bg-white/[0.03] border border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.08] active:bg-white/[0.12]'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#DEDBC8]/50 uppercase tracking-wider px-1">
                      <span>0 - Not at all likely</span>
                      <span>10 - Extremely likely</span>
                    </div>
                  </div>
                )}

                {/* 4. NUMERIC RATING (1 to 7 or 1 to 10) */}
                {currentQuestion.type === 'numeric_rating' && (
                  <div className="space-y-3 py-2">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {Array.from(
                        { length: (currentQuestion.maxRating || 7) - (currentQuestion.minRating || 1) + 1 },
                        (_, i) => (currentQuestion.minRating || 1) + i
                      ).map((num) => {
                        const isSelected = currentAnswer === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setAnswerValue(currentQuestion.id, num)}
                            className={`flex-1 min-w-[44px] h-12 rounded-xl text-sm font-mono font-bold transition-all cursor-pointer touch-manipulation flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#DEDBC8] text-black shadow-md scale-105'
                                : 'bg-white/[0.03] border border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.08]'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. LIKERT SCALE (1 to 5) */}
                {currentQuestion.type === 'likert_scale' && (
                  <div className="space-y-2 py-2">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { score: 1, label: 'Strongly Disagree' },
                        { score: 2, label: 'Disagree' },
                        { score: 3, label: 'Neutral' },
                        { score: 4, label: 'Agree' },
                        { score: 5, label: 'Strongly Agree' },
                      ].map((item) => {
                        const isSelected = currentAnswer === item.score;
                        return (
                          <button
                            key={item.score}
                            type="button"
                            onClick={() => setAnswerValue(currentQuestion.id, item.score)}
                            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer touch-manipulation flex flex-col items-center justify-center min-h-[72px] ${
                              isSelected
                                ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] font-bold'
                                : 'bg-white/[0.03] border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.06] active:bg-white/[0.1]'
                            }`}
                          >
                            <span className="text-sm font-mono mb-1">{item.score}</span>
                            <span className="text-[10px] font-mono uppercase tracking-tight text-center">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 6. YES / NO */}
                {currentQuestion.type === 'yes_no' && (
                  <div className="grid grid-cols-2 gap-4 py-2">
                    {['Yes', 'No'].map((choice) => {
                      const isSelected = currentAnswer === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setAnswerValue(currentQuestion.id, choice)}
                          className={`py-4 rounded-2xl border text-base font-bold transition-all cursor-pointer touch-manipulation min-h-[52px] ${
                            isSelected
                              ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] shadow-md'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.08]'
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 7. MULTIPLE CHOICE */}
                {currentQuestion.type === 'multiple_choice' && (
                  <div className="space-y-2.5 py-2">
                    {(currentQuestion.options || []).map((opt) => {
                      const isSelected = currentAnswer === opt.value;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAnswerValue(currentQuestion.id, opt.value)}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer touch-manipulation min-h-[48px] ${
                            isSelected
                              ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] font-semibold shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.06] active:bg-white/[0.1]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-black bg-black' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 8. CHECKBOX (Multi-select) */}
                {currentQuestion.type === 'checkbox' && (
                  <div className="space-y-2.5 py-2">
                    {(currentQuestion.options || []).map((opt) => {
                      const selectedList: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                      const isSelected = selectedList.includes(opt.value);

                      const toggleOption = () => {
                        if (isSelected) {
                          setAnswerValue(
                            currentQuestion.id,
                            selectedList.filter((v) => v !== opt.value)
                          );
                        } else {
                          setAnswerValue(currentQuestion.id, [...selectedList, opt.value]);
                        }
                      };

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={toggleOption}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer touch-manipulation min-h-[48px] ${
                            isSelected
                              ? 'bg-white/[0.08] border-[#DEDBC8] text-[#E1E0CC]'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#E1E0CC]/80 hover:bg-white/[0.06]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#DEDBC8] bg-[#DEDBC8] text-black' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 9. SHORT TEXT */}
                {currentQuestion.type === 'short_text' && (
                  <div className="py-2">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={currentAnswer || ''}
                      onChange={(e) => setAnswerValue(currentQuestion.id, e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-[#E1E0CC] placeholder:text-white/30 focus:outline-none focus:border-[#DEDBC8]"
                    />
                  </div>
                )}

                {/* 10. LONG TEXT */}
                {currentQuestion.type === 'long_text' && (
                  <div className="py-2">
                    <textarea
                      rows={4}
                      placeholder="Share your detailed feedback, ideas, or comments..."
                      value={currentAnswer || ''}
                      onChange={(e) => setAnswerValue(currentQuestion.id, e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-[#E1E0CC] placeholder:text-white/30 focus:outline-none focus:border-[#DEDBC8] resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Optional Anonymous / Identity Bar on final question */}
              {currentIndex === visibleQuestions.length - 1 && survey.allowAnonymous && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#DEDBC8]/80">
                      <Lock className="w-3.5 h-3.5 text-[#DEDBC8]" />
                      <span>Submit Anonymously</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#DEDBC8] cursor-pointer"
                    />
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={respondentName}
                        onChange={(e) => setRespondentName(e.target.value)}
                        className="p-3 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC] placeholder:text-white/30"
                      />
                      <input
                        type="email"
                        placeholder="Your Email (Optional)"
                        value={respondentEmail}
                        onChange={(e) => setRespondentEmail(e.target.value)}
                        className="p-3 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC] placeholder:text-white/30"
                      />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* Thank you completion card */
            <motion.div
              key="thank-you-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-3xl font-bold text-[#E1E0CC]">Thank you!</h3>
              <p className="text-xs sm:text-sm text-[#DEDBC8]/70 max-w-sm mx-auto leading-relaxed">
                Your feedback has been securely registered and synchronized with the operations radar.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-[#DEDBC8] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Response</span>
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav & Progress Bar */}
      {!isSubmitted && visibleQuestions.length > 0 && (
        <div className="pt-4 border-t border-white/[0.06] max-w-2xl mx-auto w-full">
          {/* Progress Indicator */}
          <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#DEDBC8] transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
                currentIndex === 0
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-[#DEDBC8]/70 hover:text-[#DEDBC8] hover:bg-white/[0.04]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all shadow-md shadow-[#DEDBC8]/10 cursor-pointer min-h-[44px]"
            >
              <span>{currentIndex === visibleQuestions.length - 1 ? 'Submit Feedback' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
