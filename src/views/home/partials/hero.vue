<template>
  <ve-hero class="hero" :height="100">
    <div class="hero__background">
      <div
        class="hero__cover"
        :style="{ 'background-image': `url(${background})` }"
      />
      <div class="hero__layer" />
    </div>
    <ve-container>
      <div class="hero__content">
        <div class="hero__body">
          <span class="hero__label">{{ hero.label }}</span>
          <h1 class="hero__title" v-html="hero.title" />
          <p class="hero__subtitle">{{ hero.subtitle }}</p>
        </div>
      </div>
    </ve-container>
  </ve-hero>
</template>

<script lang="ts">
import config from "@/config";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { SchemaInterface } from "@/store/landingpage/types";
import VeContainer from "@/components/Grid/Container";
import VeHero from "@/components/Hero";

const landingpage = namespace("landingpage");

@Component({
  name: "ViewPartialHero",
  components: { VeContainer, VeHero }
})
export default class ViewPartialHero extends Vue {
  @landingpage.State
  protected schema!: SchemaInterface;

  get hero() {
    return this.schema.hero;
  }

  get background() {
    return require(`@/assets${this.schema.hero.background}`);
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.hero {
  background: transparent;
  display: flex;

  &__background {
    background: red;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__cover {
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: $c-gray-lighter;
  }

  &__layer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($c-gray-lighter, 0.8);
    background: linear-gradient(
      90deg,
      rgba($c-gray-lighter, 1) 0%,
      rgba($c-gray-lighter, 0.3) 100%
    );
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  &__body {
    width: 264px;
  }

  &__label {
    font-family: $font-family-cursive;
    font-size: $font-base;
    color: $c-primary;
  }

  &__title {
    margin: 0;
    color: $c-dark;
    font-family: $font-sans;
    font-size: $font-5xl;
    font-weight: $fw-semibold;
    line-height: 1;
    text-transform: uppercase;
  }

  &__subtitle {
    font-family: $font-family-monospace;
    font-size: $font-lg;
    color: $c-gray-darker;
    text-align: right;
    text-transform: uppercase;
  }
}
</style>
