<template>
  <div class="contact">
    <ve-container>
      <div class="contact__content">
        <div class="contact__body">
          <div class="contact__header">
            <span class="contact__label">Text me</span>
            <h2 class="contact__title">Contact</h2>
          </div>

          <div class="contact__form">
            <ve-input-text
              v-model="name"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.name') | capitalize"
              :helper-text="errors.name"
              :type="errors.name !== null ? 'danger' : null"
              :disabled="loading"
            />

            <ve-input-text
              v-model="email"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.email') | capitalize"
              :helper-text="errors.email"
              :type="errors.email !== null ? 'danger' : null"
              :disabled="loading"
            />

            <ve-input-textarea
              v-model="message"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.message') | capitalize"
              :helper-text="errors.message"
              :type="errors.message !== null ? 'danger' : null"
              :disabled="loading"
              :rows="4"
            />

            <ve-button @click="sendForm" :disabled="this.loading">
              <font-awesome-icon icon="paper-plane" slot="icon" />
              {{ $t("dictionary.send") | capitalize }}
            </ve-button>
          </div>
        </div>
      </div>
    </ve-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import LandingpageService from "@/services/landingpageService";
import VeContainer from "@/components/Grid/Container";
import VeInputText from "@/components/Input/Text";
import VeInputTextarea from "@/components/Input/Textarea";
import VeButton from "@/components/Button";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

library.add(faPaperPlane);

@Component({
  name: "ViewPartialContact",
  components: {
    FontAwesomeIcon,
    VeButton,
    VeContainer,
    VeInputText,
    VeInputTextarea
  }
})
export default class ViewPartialContact extends Vue {
  protected landingService = new LandingpageService();

  protected name: string | null = null;
  protected email: string | null = null;
  protected message: string | null = null;
  protected loading = false;
  protected errors = {
    name: null,
    email: null,
    message: null
  };

  async sendForm() {
    this.loading = true;

    try {
      if (this.name === null || this.email === null || this.message === null) {
        return;
      }

      const res = await this.landingService.contactForm(
        this.name,
        this.email,
        this.message
      );

      this.loading = false;
    } catch (e) {
      console.error("Error getting data from landingpage");
      console.error(e.status, e.statusText, "<--", e.data, "-->");

      const data = e.data;
      if (data.name) {
        this.errors.name = data.name[0];
      }
      if (data.email) {
        this.errors.email = data.email[0];
      }
      if (data.message) {
        this.errors.message = data.message[0];
      }

      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.contact {
  background: transparent;
  display: flex;
  min-width: 320px;

  .dark & {
    background: darken($c-white, 90%);

    &__title, &__subtitle {
      color: $c-gray-lightest;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    padding: $padding-3xl 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__header {
    max-width: 640px;
    width: 100%;
    text-align: center;
    align-self: center;
    margin-bottom: $margin-xl;
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

  &__label {
    font-family: $font-family-cursive;
    font-size: $font-base;
    color: $c-primary;
  }

  &__form {
    max-width: 640px;
    width: 100%;
    text-align: center;
  }

  &__form-control {
    margin-bottom: $margin-lg;
  }
}
</style>
