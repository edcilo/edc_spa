<template>
  <div class="aboout">
    <ve-container>
      <div class="about__content">
        <div class="about__body">
          <span class="about__label">{{ about.label }}</span>
          <h2 class="about__title">{{ about.title }}</h2>
          <p class="about__description">{{ about.description }}</p>
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
  name: "ViewPartialAbout",
  components: { VeContainer }
})
export default class ViewPartialAbout extends Vue {
  @landingpage.State
  protected schema!: SchemaInterface;

  get about() {
    return this.schema.about;
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.about {
  background: transparent;
  display: flex;

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: $padding-3xl 0;
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
    margin: 0 0 $margin-lg;
    color: $c-dark;
    font-family: $font-sans-2;
    font-size: $font-4xl;
    font-weight: $fw-semibold;
    line-height: 1;
    text-transform: uppercase;
  }

  &__description {
    color: $c-gray-darker;
  }
}
</style>
