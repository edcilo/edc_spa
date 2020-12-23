<template>
  <landing-layout>
    <partial-hero />
    <partial-about />
    <partial-powered-by />
    <partial-contact />
    <partial-footer />
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
import PartialPoweredBy from "@/views/home/partials/poweredBy.vue";
import PartialContact from "@/views/home/partials/contact.vue";
import PartialFooter from "@/views/home/partials/footer.vue";

@Component({
  name: "ViewHome",
  components: {
    LandingLayout,
    PartialHero,
    PartialAbout,
    PartialPoweredBy,
    PartialContact,
    PartialFooter
  },
  metaInfo() {
    const title: string = config("app.name");

    return {
      title: title,
      meta: [{ name: "description", content: "edcilo.com it's the beginning." }]
    };
  }
})
export default class ViewHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";
</style>
