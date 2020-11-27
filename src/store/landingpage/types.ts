export interface  SchemaInterface {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    background: string;
  },
  about: {
    label: string;
    title: string;
    description: string;
  },
  powered_by: {
    label: string;
    title: string;
    branding: Array<string>;
  },
  footer: {
    title: string;
    email: string;
    address: string;
    social: {
      facebook: string;
      linkedin: string;
      twitter: string;
    };
  }
}

export default interface LandingState {
  name: string | null;
  schema: SchemaInterface | null;
}
