export type NavTab = 
  | 'home'
  | 'about'
  | 'programs'
  | 'projects'
  | 'gallery'
  | 'news'
  | 'team'
  | 'contact';

export interface ProgramPillar {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyActivities: string[];
  sdgGoals: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Reforestation' | 'Education' | 'Clean Water' | 'Agriculture' | 'Biodiversity';
  location: string;
  status: 'Active' | 'Completed' | 'Expanding';
  summary: string;
  impactMetric: string;
  treesPlanted?: number;
  peopleImpacted?: number;
  startDate: string;
  image: string;
  highlights: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'School Outreach' | 'Reforestation' | 'Partnerships' | 'Community';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  image: string;
  email?: string;
}

export interface ImpactStat {
  label: string;
  value: number;
  unit: string;
  icon: string;
  description: string;
}

export interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  roleType: 'Youth Ambassador' | 'Local Tree Planter' | 'School Educator' | 'Technical / Research' | 'Donor / Partner';
  location: string;
  message: string;
}
