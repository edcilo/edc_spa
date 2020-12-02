<template>
  <landing-layout>
    <partial-hero />
    <partial-about />
    <powered-by />
    <contact />
  </landing-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import config from "@/config";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import LandingLayout from "@/layouts/landing.vue";
import PartialHero from "@/views/home/partials/hero.vue";
import PartialAbout from "@/views/home/partials/about.vue";
import PoweredBy from "@/views/home/partials/poweredBy.vue";
import Contact from "@/views/home/partials/footer.vue";

@Component({
  name: "ViewHome",
  components: {
    LandingLayout,
    PartialHero,
    PartialAbout,
    PoweredBy,
    Contact
  },
  metaInfo() {
    const title: string = config("app.name");

    return {
      title: title,
      meta: [{ name: "description", content: "EVA - Vue.js framework" }]
    };
  }
})
export default class ViewHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";
</style>
