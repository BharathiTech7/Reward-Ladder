import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Lock,
  Unlock,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Gift,
} from 'lucide-react';
import { Milestone } from '../types';
import { soundFx } from '../utils/soundEffects';

interface MilestoneDetailModalProps {
  milestone: Milestone | null;
  currentRegistrations: number;
  onClose: () => void;
  onOpenShareModal: () => void;
}

export const MilestoneDetailModal: React.FC<MilestoneDetailModalProps> = ({
  milestone,
  currentRegistrations,
  onClose,
  onOpenShareModal,
}) => {
  if (!milestone) return null;

  const isUnlocked = currentRegistrations >= milestone.registrationsRequired;
  const remainingRegs = Math.max(0, milestone.registrationsRequired - currentRegistrations);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#09090B] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left overflow-hidden"
        >
          {/* Top Radial Glow */}
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${milestone.colorTheme.gradient} opacity-20`}
          />

          {/* Close Button */}
          <button
            id="close-milestone-modal"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {milestone.stageNumber}
            </span>

            {isUnlocked ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-lime-500/20 text-[#A3E635] border border-lime-500/40">
                <Unlock className="w-3.5 h-3.5" /> Unlocked & Claimable
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-[#FF5500] border border-orange-500/40">
                <Lock className="w-3.5 h-3.5" /> Needs {remainingRegs} More Student Regs
              </span>
            )}
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div
              className={`p-4 rounded-2xl bg-gradient-to-br ${milestone.colorTheme.gradient} shadow-xl text-white shrink-0`}
            >
              <Package className="w-8 h-8 text-[#A3E635]" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{milestone.title}</h2>
              <p className="text-sm text-zinc-400 mt-1">{milestone.perksDetail.overview}</p>
            </div>
          </div>

          {/* Value Badge */}
          {milestone.valueEstimate && (
            <div className="p-3 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-between text-xs font-bold text-[#A3E635] mb-6">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A3E635]" />
                Estimated Total Perk Value:
              </span>
              <span className="text-base text-white font-black">{milestone.valueEstimate}</span>
            </div>
          )}

          {/* Deliverables Checklist */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#A3E635]" /> What You Get Upon Unlocking
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {milestone.perksDetail.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#111111] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isUnlocked ? 'text-[#A3E635]' : 'text-zinc-500'
                    }`}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credential Type */}
          {milestone.perksDetail.certificateType && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-[#A3E635] shrink-0" />
              <div>
                <div className="text-[11px] text-zinc-400 font-bold uppercase">
                  Verified Industry Certificate
                </div>
                <div className="text-sm font-bold text-white">
                  {milestone.perksDetail.certificateType}
                </div>
              </div>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            {isUnlocked ? (
              <button
                id="btn-claim-unlocked-perks"
                onClick={() => {
                  soundFx.playUnlock();
                  alert(`🎉 Congratulations! Your claim request for "${milestone.title}" has been registered. The EYFI Ambassador team will contact you on WhatsApp!`);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#A3E635] text-black font-extrabold text-sm shadow-xl shadow-lime-500/20 hover:bg-lime-400 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Claim Your Rewards Now
              </button>
            ) : (
              <button
                id="btn-modal-boost-regs"
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                  onOpenShareModal();
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#A3E635] text-black font-extrabold text-sm shadow-xl shadow-lime-500/20 hover:bg-lime-400 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Share Link to Unlock ({remainingRegs} Regs Needed)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              id="btn-close-modal-secondary"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#111111] hover:bg-zinc-800 text-zinc-300 font-bold text-sm border border-white/10 transition-all"
            >
              Back to Ladder
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

