import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface LabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabModal: React.FC<LabModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('Director / Filmmaker');
  const [portfolio, setPortfolio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setPortfolio('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="prisma-lab-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            id="prisma-lab-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-10 max-w-lg w-full relative shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prisma Collective</span>
                  </div>
                  <h3 className="text-2xl font-normal text-[#E1E0CC]">
                    Join the creative lab
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Apply for fellowship grants, closed workshops, and collaborative studio productions.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs text-primary/80 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@noir.paris"
                      className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-primary/80 uppercase tracking-wider mb-1.5">
                      Creative Discipline
                    </label>
                    <select
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="Director / Filmmaker">Director / Filmmaker</option>
                      <option value="Cinematographer / DOP">Cinematographer / DOP</option>
                      <option value="Colorist & Finishing">Colorist & Finishing</option>
                      <option value="Visual Effects & 3D Artist">Visual Effects & 3D Artist</option>
                      <option value="Sound Designer & Composer">Sound Designer & Composer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-primary/80 uppercase tracking-wider mb-1.5">
                      Portfolio / Showreel link (optional)
                    </label>
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://vimeo.com/your-showreel"
                      className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#eae7d6] text-black font-medium py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors duration-200 mt-6 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-normal text-[#E1E0CC]">
                  Application Received
                </h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Thank you for applying to the Prisma creative lab. Our curation board reviews incoming reels every Friday.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 inline-block bg-primary text-black text-xs font-medium px-6 py-2.5 rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
