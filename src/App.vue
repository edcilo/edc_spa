<template>
  <div id="app" :class="[className, {dark: darkMode}]">
    <ve-loading
      :open="loading"
      :fullscreen="loader.fullscreen"
      :opacity="loader.opacity"
    >
      <img src="@/assets/edcilo-logo-clear.svg" class="loader-logo" />
    </ve-loading>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { namespace } from "vuex-class";

import VeLoading from "@/components/Loading";
import LandingpageService from "@/services/landingpageService";

const app = namespace("app");
const landingpage = namespace("landingpage");

@Component({
  name: "App",
  components: {
    VeLoading
  }
})
export default class App extends Vue {
  protected className: string | null = null;
  protected landingService = new LandingpageService();

  @app.State
  protected darkMode!: boolean;

  @app.State
  protected loading!: boolean;

  @app.Mutation
  protected setLoading!: Function;

  @landingpage.Mutation
  protected setName!: Function;

  @landingpage.Mutation
  protected setSchema!: Function;

  protected loader = {
    fullscreen: true,
    opacity: 1
  };

  @Watch("$route", { immediate: true })
  onRoutehanged(to: Route) {
    this.className = to.name || null;
  }

  async mounted() {
    this.setLoading(true);

    try {
      const res = await this.landingService.getSchema();

      this.setName(res.data.name);
      this.setSchema(res.data.schema);
      this.setLoading(false);
    } catch (e) {
      console.error("Error getting data from landingpage");
      console.error(e.status, e.statusText);
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/main";

#app {
  background: $c-white;

  &.dark {
    background: darken($c-white, 90%);
  }
}

.loader-logo {
  width: 120px;
  height: auto;
}
</style>
