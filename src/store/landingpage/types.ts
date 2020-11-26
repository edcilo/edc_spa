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
  }
}

export default interface LandingState {
  name: string | null;
  schema: SchemaInterface | null;
}
