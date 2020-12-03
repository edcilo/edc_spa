<template>
  <div class="footer">
    <ve-container>
      <div class="footer__content">
        <div class="footer__body" v-if="footer !== null">
          <ve-row>
            <ve-col class="footer__col-1">
              <img
                class="footer__logo"
                :src="require('@/assets/edcilo-logo-clear.svg')"
                alt="logo-white"
              />
            </ve-col>
            <ve-col />
            <ve-col />
            <ve-col class="footer__col-4">
              <h3 class="footer__title">{{ footer.title }}</h3>
              <ul>
                <li>
                  <a :href="`mailto:${footer.email}`">{{ footer.email }}</a>
                </li>
                <li>{{ footer.address }}</li>
              </ul>
              <ul class="footer__social">
                <li v-for="(link, net) in footer.social" :key="net">
                  <a :href="link" target="_blank">
                    <font-awesome-icon :icon="['fab', net]" />
                  </a>
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

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faLinkedin, faTwitter);

const landingpage = namespace("landingpage");

@Component({
  name: "ViewPartialFooter",
  components: { FontAwesomeIcon, VeContainer, VeRow, VeCol }
})
export default class ViewPartialFooter extends Vue {
  @landingpage.State
  protected schema!: SchemaInterface;

  get footer() {
    return this.schema.footer;
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.footer {
  background: $c-gray-darkest;

  &__content {
    padding: $padding-lg;
  }

  &__col-1,
  &__col-4 {
    text-align: center;
    color: $c-white;
  }

  &__logo {
    width: 80px;
  }

  &__title {
    margin: 0 0 $margin-lg;
    font-family: $font-sans-2;
    font-size: $font-2xl;
    font-weight: $fw-semibold;
    line-height: 1;
    text-transform: uppercase;
  }

  &__social {
    display: flex;
    justify-content: center;

    li {
      margin: 0 $margin-sm;

      a {
        color: $c-white;
      }
    }
  }
}
</style>
