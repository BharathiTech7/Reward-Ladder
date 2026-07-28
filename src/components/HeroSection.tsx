import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Users, ShieldCheck, ArrowRight, Flame } from 'lucide-react';

interface HeroSectionProps {
  currentRegistrations: number;
  currentRankName: string;
  nextMilestoneRegs: number;
  onScrollToLadder: () => void;
  onOpenShareModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentRegistrations,
  currentRankName,
  nextMilestoneRegs,
  onScrollToLadder,
  onOpenShareModal,
}) => {
  const progressPercent = Math.min(100, Math.round((currentRegistrations / 200) * 100));

  return (
    <div className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      
      {/* Top Floating Pill Badge - Orange & Lime EYFI Theme */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-white/15 backdrop-blur-md mb-6 shadow-xl"
      >
        <Sparkles className="w-4 h-4 text-[#A3E635] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-xs sm:text-sm font-bold text-white">
          EYFI Campus Ambassador Program
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FF5500] text-white uppercase tracking-wider">
          Gamified Track
        </span>
      </motion.div>

      {/* Main Title - Huge Bold EYFI Typography */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6"
      >
        Earned, <span className="text-[#A3E635]">not handed.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed mb-8"
      >
        Every registration unlocks rewards, exclusive grants, and brings you closer to becoming an{' '}
        <span className="text-[#A3E635] font-bold">EYFI Campus Legend</span>.
      </motion.p>

      {/* Live Rank & Progress Bar Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl mx-auto p-5 sm:p-6 rounded-3xl bg-[#111111] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-8"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3E635]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-left">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" /> Current Rank Designation
            </div>
            <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              <span>{currentRankName}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 font-extrabold">
                {currentRegistrations} Regs
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-zinc-400 font-medium">Overall Progress</div>
            <div className="text-lg font-black text-[#A3E635]">{progressPercent}% Completed</div>
          </div>
        </div>

        {/* Dynamic Progress Bar - EYFI Neon Green Fill */}
        <div className="relative w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div
            className="h-full bg-[#A3E635] rounded-full relative shadow-sm shadow-lime-500/50"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/90 rounded-full animate-pulse" />
          </motion.div>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-400 mt-2.5 font-medium">
          <span>Stage 01: Scout (0)</span>
          <span>Next Goal: {nextMilestoneRegs > currentRegistrations ? `${nextMilestoneRegs} Regs` : 'Maxed Out! 🎉'}</span>
          <span>Stage 06: Legend (200)</span>
        </div>
      </motion.div>

      {/* CTA Buttons - EYFI Style Rounded Green Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          id="btn-explore-ladder"
          onClick={onScrollToLadder}
          className="px-8 py-3.5 rounded-full bg-[#A3E635] text-black font-extrabold text-sm sm:text-base shadow-xl shadow-lime-500/10 hover:bg-lime-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border border-lime-300/40"
        >
          <span>Explore Reward Ladder</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          id="btn-hero-share"
          onClick={onOpenShareModal}
          className="px-8 py-3.5 rounded-full bg-[#111111] hover:bg-zinc-800 text-white font-bold text-sm sm:text-base border border-white/15 hover:border-white/30 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Flame className="w-4 h-4 text-[#FF5500]" />
          <span>Get Your Ambassador Link</span>
        </button>
      </motion.div>

      {/* Key Program Highlights Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl mx-auto"
      >
        <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md text-left">
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#A3E635]" /> Active Ambassadors
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">1,400+</div>
          <div className="text-[11px] text-zinc-400">Across 350+ Colleges</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md text-left">
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#FF5500]" /> Total Perks Paid
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#A3E635]">₹25L+</div>
          <div className="text-[11px] text-zinc-400">Grants, Swag & Cash</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md text-left">
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" /> Paid Internships
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">85+</div>
          <div className="text-[11px] text-zinc-400">Fast-Track Hires</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md text-left">
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5500]" /> Founding Roles
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#A3E635]">12 Leads</div>
          <div className="text-[11px] text-zinc-400">Promoted to EYFI Core</div>
        </div>
      </motion.div>

    </div>
  );
};

