/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationSimulator } from './components/RegistrationSimulator';
import { RewardLadder } from './components/RewardLadder';
import { AmbassadorPerksCalculator } from './components/AmbassadorPerksCalculator';
import { HallOfFame } from './components/HallOfFame';
import { MilestoneDetailModal } from './components/MilestoneDetailModal';
import { ReferralShareModal } from './components/ReferralShareModal';
import { Footer } from './components/Footer';
import { Milestone } from './types';
import { milestonesData } from './data/milestonesData';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [registrations, setRegistrations] = useState<number>(35); // Default to 35 for exciting initial state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ladder' | 'perks' | 'leaderboard'>('ladder');
  
  // Modals state
  const [inspectedMilestone, setInspectedMilestone] = useState<Milestone | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Sync soundFx toggle
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Rank designation logic
  const getRankDesignation = (regs: number) => {
    if (regs >= 200) return 'EYFI Founding Legend 👑';
    if (regs >= 100) return 'Senior Ambassador & Intern Track 💼';
    if (regs >= 75) return 'Mentorship Star 🎓';
    if (regs >= 50) return 'Campus Mobilizer & Grant Lead 🎁';
    if (regs >= 25) return 'Official Campus Ambassador 🏅';
    return 'EYFI Campus Scout 🚀';
  };

  const getNextMilestoneRegs = (regs: number) => {
    if (regs < 25) return 25;
    if (regs < 50) return 50;
    if (regs < 75) return 75;
    if (regs < 100) return 100;
    if (regs < 200) return 200;
    return 200;
  };

  const unlockedCount = milestonesData.filter(m => registrations >= m.registrationsRequired).length;

  const scrollToLadder = () => {
    soundFx.playClick();
    setActiveTab('ladder');
    const elem = document.getElementById('reward-ladder-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white relative font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Dynamic Floating Canvas Particles */}
      <ParticleBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          registrations={registrations}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          
          {/* Top Hero Section */}
          <HeroSection
            currentRegistrations={registrations}
            currentRankName={getRankDesignation(registrations)}
            nextMilestoneRegs={getNextMilestoneRegs(registrations)}
            onScrollToLadder={scrollToLadder}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />

          {/* Interactive Registration Simulator Bar */}
          <RegistrationSimulator
            registrations={registrations}
            setRegistrations={setRegistrations}
            unlockedCount={unlockedCount}
            totalMilestones={milestonesData.length}
          />

          {/* Tab 1: Main Reward Ladder */}
          {activeTab === 'ladder' && (
            <RewardLadder
              currentRegistrations={registrations}
              onInspectMilestone={(m) => setInspectedMilestone(m)}
            />
          )}

          {/* Tab 2: Perks Estimator Calculator */}
          {activeTab === 'perks' && (
            <AmbassadorPerksCalculator
              onSetSimulatorTarget={(target) => {
                setRegistrations(target);
                setActiveTab('ladder');
                scrollToLadder();
              }}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          )}

          {/* Tab 3: Embedded Leaderboard / Hall of Fame View */}
          {activeTab === 'leaderboard' && (
            <div className="py-10 px-4 max-w-4xl mx-auto space-y-6">
              {/* Back to Reward Ladder Navigation Bar */}
              <div className="flex items-center justify-between gap-4 bg-zinc-900/80 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <button
                  id="btn-back-to-ladder"
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('ladder');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:-translate-x-1"
                >
                  ← Back to Reward Ladder
                </button>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Your Current Impact</div>
                  <div className="text-sm font-black text-amber-300">{registrations} Verified Registrations</div>
                </div>
              </div>

              {/* Embedded Hall of Fame Content */}
              <div className="relative bg-zinc-900 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 text-left overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">
                      👑 EYFI National Leaderboard
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Ambassador Hall of Fame
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                  Meet the top student campus leads driving EYFI registrations across India’s premier universities.
                </p>

                {/* Leaderboard Table List */}
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Ananya Sharma', college: 'IIT Bombay', regs: 184, badge: 'Founding Legend' },
                    { rank: 2, name: 'Rohan Verma', college: 'BITS Pilani', regs: 142, badge: 'Senior Lead' },
                    { rank: 3, name: 'Priya Patel', college: 'Delhi University', regs: 118, badge: 'Campus Star' },
                    { rank: 4, name: 'You (Simulated)', college: 'Your Campus', regs: registrations, badge: getRankDesignation(registrations), isUser: true },
                    { rank: 5, name: 'Karan Mehta', college: 'SRM University', regs: 68, badge: 'Mobilizer' },
                    { rank: 6, name: 'Sneha Reddy', college: 'VIT Vellore', regs: 52, badge: 'Ambassador' },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        user.isUser
                          ? 'bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-zinc-950 border-blue-400 shadow-xl shadow-blue-500/10'
                          : user.rank === 1
                          ? 'bg-amber-500/10 border-amber-500/40'
                          : 'bg-zinc-950/80 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="shrink-0 w-8 text-center font-black text-amber-400 text-lg">
                          #{user.rank}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                            <span>{user.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-semibold shrink-0">
                              {user.badge}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 truncate">{user.college}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base font-extrabold text-amber-300">{user.regs} Regs</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Back Button */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('ladder');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
                  >
                    ← Back to Reward Ladder
                  </button>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-bold text-sm border border-amber-500/40 transition-all"
                  >
                    Share My Ranking 🚀
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <Footer
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />

      </div>

      {/* Modals & Overlays */}
      <MilestoneDetailModal
        milestone={inspectedMilestone}
        currentRegistrations={registrations}
        onClose={() => setInspectedMilestone(null)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      <HallOfFame
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        userRegistrations={registrations}
      />

      <ReferralShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
}
