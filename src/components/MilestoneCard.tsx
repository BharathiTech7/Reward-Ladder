import React from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  Award,
  Gift,
  GraduationCap,
  Briefcase,
  Crown,
  Lock,
  Unlock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Milestone } from '../types';
import { soundFx } from '../utils/soundEffects';

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  currentRegistrations: number;
  onInspectMilestone: (milestone: Milestone) => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  index,
  currentRegistrations,
  onInspectMilestone,
}) => {
  const isUnlocked = currentRegistrations >= milestone.registrationsRequired;
  const isNextTarget =
    !isUnlocked &&
    (index === 0 || currentRegistrations >= (milestone.registrationsRequired * 0.6));

  // Icon Resolver
  const renderIcon = () => {
    const iconProps = { className: 'w-7 h-7 sm:w-8 sm:h-8 text-white' };
    switch (milestone.iconName) {
      case 'Rocket':
        return <Rocket {...iconProps} />;
      case 'Badge':
        return <Award {...iconProps} />;
      case 'Gift':
        return <Gift {...iconProps} />;
      case 'GraduationCap':
        return <GraduationCap {...iconProps} />;
      case 'Briefcase':
        return <Briefcase {...iconProps} />;
      case 'Crown':
        return <Crown {...iconProps} />;
      default:
        return <Sparkles {...iconProps} />;
    }
  };

  const isDesktopLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center w-full mb-12 sm:mb-20 ${
        isDesktopLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* CARD CONTAINER (Half width on desktop) */}
      <div className="w-full md:w-[calc(50%-2.5rem)] px-2 sm:px-0">
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => {
            soundFx.playClick();
            onInspectMilestone(milestone);
          }}
          className={`group relative p-6 sm:p-7 rounded-3xl backdrop-blur-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
            isUnlocked
              ? 'bg-zinc-900/80 border border-white/20 shadow-2xl hover:border-white/40'
              : 'bg-zinc-950/70 border border-white/10 opacity-90 hover:opacity-100 hover:border-white/20'
          }`}
          style={{
            boxShadow: isUnlocked
              ? `0 20px 40px -15px ${milestone.colorTheme.borderGlow}`
              : '0 10px 30px -15px rgba(0,0,0,0.5)',
          }}
        >
          {/* Glowing Ambient Gradient Background inside Card */}
          <div
            className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${
              milestone.colorTheme.gradient
            } ${isUnlocked ? 'opacity-30 group-hover:opacity-50' : 'opacity-10'}`}
          />

          {/* Top Stage Header & Lock Badge */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {milestone.stageNumber}
              </span>

              {milestone.valueEstimate && (
                <span className="text-[11px] font-bold text-[#A3E635] bg-lime-500/10 px-2.5 py-1 rounded-full border border-lime-500/20">
                  {milestone.valueEstimate}
                </span>
              )}
            </div>

            {/* Locked vs Unlocked Badge Requirement */}
            <div>
              {isUnlocked ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lime-500/20 text-[#A3E635] border border-lime-500/40 shadow-sm">
                  <Unlock className="w-3.5 h-3.5" /> UNLOCKED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-800/80 text-zinc-400 border border-white/10">
                  <Lock className="w-3.5 h-3.5" /> LOCKED
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Floating Icon Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Floating Icon Box */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.3,
              }}
              className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br ${milestone.colorTheme.gradient} shadow-lg shrink-0 flex items-center justify-center`}
              style={{
                boxShadow: `0 10px 25px -5px ${milestone.colorTheme.borderGlow}`,
              }}
            >
              {renderIcon()}
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#A3E635] transition-colors">
                {milestone.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal line-clamp-2 mt-0.5">
                {milestone.subtitle}
              </p>
            </div>
          </div>

          {/* Unlocks List */}
          <div className="space-y-2 py-3 border-t border-b border-white/10 mb-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Unlocks Included:
            </div>
            {milestone.unlocks.map((perk, perkIdx) => (
              <div key={perkIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isUnlocked ? milestone.colorTheme.textAccent : 'text-zinc-500'
                  }`}
                />
                <div className="text-zinc-200 font-medium">
                  <span className="font-semibold text-white">{perk.title}</span>
                  {perk.description && (
                    <span className="text-zinc-400 text-xs block sm:inline sm:ml-1">
                      — {perk.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-400">
              Req: <strong className="text-white">{milestone.registrationsRequired}</strong> Student Regs
            </span>

            <button
              id={`btn-inspect-milestone-${milestone.id}`}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                isUnlocked
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/10'
              }`}
            >
              <span>{isUnlocked ? 'View Details & Claim' : 'Preview Perks'}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* CENTRAL TIMELINE NODE (Desktop center, mobile left) */}
      <div className="relative flex items-center justify-center my-4 md:my-0 z-10 shrink-0">
        <motion.div
          animate={isUnlocked ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-sm shadow-2xl transition-all ${
            isUnlocked
              ? `bg-[#09090B] border-[#A3E635] text-[#A3E635] shadow-lime-500/50`
              : isNextTarget
              ? `bg-[#09090B] border-[#FF5500] text-[#FF5500] animate-pulse shadow-orange-500/40`
              : `bg-[#09090B] border-zinc-800 text-zinc-500`
          }`}
        >
          {isUnlocked ? (
            <CheckCircle2 className="w-6 h-6 text-[#A3E635]" />
          ) : (
            <span>{index + 1}</span>
          )}
        </motion.div>
      </div>

      {/* EMPTY BALANCING SIDE (For desktop timeline symmetry) */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
};
