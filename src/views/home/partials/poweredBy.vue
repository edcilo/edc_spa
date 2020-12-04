<template>
  <div class="powered-by">
    <ve-container>
      <div class="powered-by__content">
        <div class="powered-by__body" v-if="poweredBy !== null">
          <span class="powered-by__label">{{ poweredBy.label }}</span>
          <h2 class="powered-by__title">{{ poweredBy.title }}</h2>
          <div class="powered-by__branding">
            <img
              v-for="icon in poweredBy.branding"
              :key="icon"
              class="powered-by__logo"
              :src="importAsset(icon)"
            />
          </div>
        </div>
      </div>
    </ve-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { SchemaInterface } from "@/store/landingpage/types";
import VeContainer from "@/components/Grid/Container";

const landingpage = namespace("landingpage");

@Component({
  name: "ViewPartialPoweredBy",
  components: { VeContainer }
})
export default class ViewPartialPoweredBy extends Vue {
  @landingpage.State
  protected schema!: SchemaInterface;

  get poweredBy() {
    return this.schema !== null ? this.schema.powered_by : null;
  }

  importAsset(icon: string) {
    return require(`@/assets${icon}`);
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.powered-by {
  background: $c-gray-base;
  min-width: 320px;

  .dark & {
    background: darken($c-gray-base, 40%);

    &__title {
      color: $c-gray-lighter;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: $padding-xl 0;
  }

  &__body {
    max-width: 640px;
    width: 100%;
    text-align: center;
  }

  &__label {
    font-family: $font-family-cursive;
    font-size: $font-base;
    color: $c-primary;
  }

  &__title {
    margin: 0 0 $margin-2xl;
    color: $c-dark;
    font-family: $font-sans-2;
    font-size: $font-4xl;
    font-weight: $fw-semibold;
    line-height: 1;
    text-transform: uppercase;
  }

  &__branding {
    background: transparent;
  }

  &__logo {
    height: 50px;
    width: auto;
    margin: 0 $margin-lg $margin-xl;
  }
}
</style>
