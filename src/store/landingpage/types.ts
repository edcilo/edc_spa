export interface JobInterface {
  title: string;
  position: string;
  time: number;
}

export interface TechnologieInterface {
  title: string;
  description: string;
}

export interface SkillInterface {
  title: string;
  years: number;
}

export interface SchemaInterface {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    background: string;
  };
  about: {
    label: string;
    title: string;
    name: string;
    experience: number;
    description: string;
    jobs: {
      title: string;
      jobs: Array<JobInterface>;
    };
    doing: {
      title: string;
      description: string;
      technologies: Array<TechnologieInterface>;
    };
    skills: {
      title: string;
      skills: Array<SkillInterface>;
    };
  };
  powered_by: {
    label: string;
    title: string;
    branding: Array<string>;
  };
  contact: {
    label: string;
    title: string;
    background: string;
  };
  footer: {
    title: string;
    email: string;
    address: string;
    social: {
      facebook: string;
      linkedin: string;
      twitter: string;
    };
  };
}

export default interface LandingState {
  name: string | null;
  schema: SchemaInterface | null;
}
