
export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Frontend' | 'Backend' | 'Design' | 'DevOps' | 'Tools' | 'Other';
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface PortfolioData {
  fullName: string;
  tagline: string;
  about: string;
  email: string;
  location: string;
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  education: Education[];
}
