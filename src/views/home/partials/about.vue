<template>
  <div class="aboout">
    <ve-container>
      <div class="about__content">
        <div class="about__body">
          <div class="about__me">
            <span class="about__label">{{ about.label }}</span>
            <h2 class="about__title">{{ about.title }}</h2>
            <p class="about__description">{{ about.description }}</p>
          </div>
          <ve-row>
            <ve-col class="about__cols">
              <h3 class="about__subtitle">{{ about.jobs.title }}</h3>
              <ul>
                <li v-for="job in about.jobs.jobs" :key="job.title" class="about__job-item">
                  <h5 class="about__job-title">{{ job.title }}</h5>
                  <span class="about__job-position">{{ job.position }}</span>
                  <span class="about__job-time">{{ job.time }}</span>
                </li>
              </ul>
            </ve-col>

            <ve-col class="about__cols">
              <h3 class="about__subtitle">{{ about.doing.title }}</h3>
              <p class="about__doing-description">{{ about.doing.description }}</p>
              <ul>
                <li v-for="tech in about.doing.technologies" :key="tech.title" class="about__doing-item">
                  <h5 class="about__doing-title">{{ tech.title }}</h5>
                  <span class="about__doing-description">{{ tech.description }}</span>
                </li>
              </ul>
            </ve-col>

            <ve-col class="about__cols">
              <h3 class="about__subtitle">{{ about.skills.title }}</h3>
              <ul>
                <li v-for="skill in about.skills.skills" :key="skill.title" class="about__skills-item">
                  <ve-progress :value="100/about.experience*skill.years" />
                  <div class="about__skills-description">
                    <span class="about__skills-title">{{ skill.title }}</span>
                    <span class="about__skills-years">{{ skill.years }} {{ $t("dictionary.years") }}</span>
                  </div>
                </li>
              </ul>
            </ve-col>
          </ve-row>
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
import VeRow from "@/components/Grid/Row";
import VeCol from "@/components/Grid/Col";
import VeProgress from "@/components/Progress";

const landingpage = namespace("landingpage");

@Component({
  name: "ViewPartialAbout",
  components: { VeContainer, VeCol, VeProgress, VeRow }
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
    padding: $padding-3xl 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__me {
    max-width: 640px;
    width: 100%;
    text-align: center;
    align-self: center;
    margin-bottom: $margin-xl;
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

  &__subtitle {
    text-align: center;
    font-family: $font-sans-2;
    font-size: $font-2xl;
    font-weight: $fw-medium;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: $margin-xl;
  }

  &__description {
    color: $c-gray-darker;
  }

  &__job {
    &-item {
      margin-bottom: $margin-base;
    }

    &-title {
      color: $c-primary;
      font-size: $font-base;
      font-family: $font-sans;
      font-weight: $fw-semibold;
      margin-bottom: 0;
    }

    &-position {
      display: block;
    }

    &-time {
      display: block;
      color: $c-gray-darker;
    }
  }

  &__doing {
    &-item {
      margin-bottom: $margin-base;
    }

    &-title {
      color: $c-primary;
      font-size: $font-base;
      font-family: $font-sans;
      font-weight: $fw-semibold;
      margin-bottom: 0;
    }

    &-description {
      color: $c-gray-darker;
    }
  }

  &__skills {
    &-item {
      margin-bottom: $margin-base;
    }

    &-description {
      display: flex;
      justify-content: space-between;
    }

    &-title {}

    &-years {}
  }
}
</style>
