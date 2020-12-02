import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import appState from "./types";
import config from "@/config";

@Module({ namespaced: true, name: "app" })
export default class AppModule extends VuexModule implements appState {
  public version: string = config("app.version");

  public locale: string = config("app.locale");

  public darkMode = false;

  public headerFixed = false;

  public loading = true;

  public navDashboardExpanded = true;

  @Mutation
  closeNavDashboard() {
    this.navDashboardExpanded = false;
  }

  @Mutation
  fixHeader(fix = true) {
    this.headerFixed = fix;
  }

  @Mutation
  openNavDashboard() {
    this.navDashboardExpanded = true;
  }

  @Mutation
  setDarkmode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Mutation
  setLocale(locale: string) {
    this.locale = locale;
  }

  @Mutation
  toggleNavDashboardExpanded() {
    this.navDashboardExpanded = !this.navDashboardExpanded;
  }
}
