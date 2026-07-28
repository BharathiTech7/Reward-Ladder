export interface PerkItem {
  title: string;
  description?: string;
  highlight?: boolean;
}

export interface Milestone {
  id: number;
  stageNumber: string;
  registrationsRequired: number;
  title: string;
  subtitle: string;
  unlocks: PerkItem[];
  iconName: 'Rocket' | 'Badge' | 'Gift' | 'GraduationCap' | 'Briefcase' | 'Crown';
  colorTheme: {
    name: string;
    primary: string; // Tailwind color e.g. blue-500
    gradient: string; // Tailwind gradient e.g. from-blue-500 to-cyan-500
    borderGlow: string; // CSS rgba/hex glow
    accentHex: string;
    bgGlow: string;
    textAccent: string;
    badgeBg: string;
    badgeText: string;
  };
  valueEstimate?: string;
  perksDetail: {
    overview: string;
    deliverables: string[];
    certificateType?: string;
    bonusPerks?: string[];
  };
}

export interface LeaderboardUser {
  id: string;
  name: string;
  college: string;
  avatar: string;
  registrations: number;
  badge: string;
  city: string;
}
