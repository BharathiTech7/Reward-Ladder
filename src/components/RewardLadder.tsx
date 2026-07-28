import React from 'react';
import { motion } from 'motion/react';
import { MilestoneCard } from './MilestoneCard';
import { Milestone } from '../types';
import { milestonesData } from '../data/milestonesData';
import { Trophy, ShieldCheck, Flame } from 'lucide-react';

interface RewardLadderProps {
  currentRegistrations: number;
  onInspectMilestone: (milestone: Milestone) => void;
}

export const RewardLadder: React.FC<RewardLadderProps> = ({
  currentRegistrations,
  onInspectMilestone,
}) => {

  // Calculate progress height ratio for the central timeline path line
  const maxRegs = 200;
  const progressRatio = Math.min(1, Math.max(0, currentRegistrations / maxRegs));

  return (
    <section id="reward-ladder-section" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF5500] text-xs font-black uppercase tracking-widest mb-3">
          <Flame className="w-3.5 h-3.5 text-[#FF5500]" /> EYFI Milestones & Rewards Roadmap
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Climb the <span className="text-[#A3E635]">EYFI Reward Ladder</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-3">
          Unlock guaranteed physical swag, cash grants, 1-on-1 founder mentorship, paid internships, and co-founder consideration as your campus registrations grow.
        </p>
      </div>

      {/* Ladder Progression Grid */}
      <div className="relative">
        
        {/* Animated Connecting Vertical Line (Desktop Center / Mobile Node line) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-12 w-1.5 bg-zinc-800 rounded-full overflow-hidden hidden md:block">
          {/* Active Fill Segment */}
          <motion.div
            className="w-full bg-gradient-to-b from-[#A3E635] via-[#FF5500] to-[#A3E635] rounded-full"
            style={{
              height: `${progressRatio * 100}%`,
              boxShadow: '0 0 15px rgba(163, 230, 53, 0.8)',
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Milestones Cards Loop */}
        <div className="relative z-10">
          {milestonesData.map((milestone, idx) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={idx}
              currentRegistrations={currentRegistrations}
              onInspectMilestone={onInspectMilestone}
            />
          ))}
        </div>

        {/* Ladder Apex Finale Crown Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto mt-12 p-8 rounded-3xl bg-[#111111] border-2 border-[#A3E635]/60 text-center shadow-2xl overflow-hidden"
        >
          <div className="absolute -top-12 inset-x-0 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#A3E635]/20 blur-xl pointer-events-none" />
          </div>

          <div className="inline-flex p-4 rounded-2xl bg-lime-500/20 border border-lime-400/40 text-[#A3E635] mb-4 shadow-lg shadow-lime-500/20">
            <Trophy className="w-8 h-8 text-[#A3E635] animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Become an EYFI Founding Legend
          </h3>

          <p className="text-zinc-300 text-sm max-w-lg mx-auto mb-6">
            Reach 200+ campus registrations to get fast-tracked directly into core leadership, equity grants, and lifelong alumni founder clout.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#A3E635]">
            <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
            <span>Guaranteed LoR & Executive Endorsement for Top Performers</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

