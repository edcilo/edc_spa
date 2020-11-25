export interface  SchemaInterface {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    background: string;
  }
}

export default interface LandingState {
  name: string | null;
  schema: SchemaInterface | null;
}
