import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import LandingState, { SchemaInterface } from "./types";

@Module({ namespaced: true, name: "app" })
export default class LandingModule extends VuexModule implements LandingState {
  public name: string | null = null;

  public schema: SchemaInterface | null = null;

  @Mutation
  setName(name: string) {
    this.name = name;
  }

  @Mutation
  setSchema(schema: SchemaInterface) {
    this.schema = schema;
  }
}
