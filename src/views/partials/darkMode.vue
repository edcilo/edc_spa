<template>
  <div class="dark-mode">
    <font-awesome-icon class="dark-mode__sun" icon="sun" />
    <ve-input-switch
      v-model="switchVal"
      :checked="darkMode"
      @change="toggleDarkMode(!darkMode)"
    />
    <font-awesome-icon class="dark-mode__moon" icon="moon" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import VeInputSwitch from "@/components/Input/Switch";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

library.add(faSun, faMoon);

const app = namespace("app");

@Component({
  name: "ViewpartialLang",
  components: {
    FontAwesomeIcon,
    VeInputSwitch
  }
})
export default class ViewPartialLang extends Vue {
  public switchVal = false;

  @app.State
  protected darkMode!: boolean;

  @app.Mutation
  protected setDarkmode!: Function;

  protected toggleDarkMode(darkMode: boolean) {
    this.setDarkmode(darkMode);
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.dark-mode {
  display: inline;

  &__sun, &__moon {
    margin-right: $margin-sm;
  }

  .ve-switch {
    margin: 0;
  }
}
</style>
