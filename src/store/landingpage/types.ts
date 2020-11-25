export interface  SchemaInterface {
  name: string;
  schema: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    }
  }
}

export default interface LandingState {
  name: string | null;
  schema: SchemaInterface | null;
}
