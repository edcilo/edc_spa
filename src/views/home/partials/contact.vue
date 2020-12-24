<template>
  <div class="contact">
    <div
      v-show="background !== null"
      class="contact__cover"
      :style="{ 'background-image': `url(${background})` }"
    />
    <div class="contact__layer" />

    <ve-container>
      <div class="contact__content">
        <div class="contact__body">
          <div class="contact__header">
            <span class="contact__label">{{ contact.label }}</span>
            <h2 class="contact__title">{{ contact.title }}</h2>
          </div>

          <div class="contact__form">
            <ve-alert
              type="success"
              :dismissible="true"
              :time="8"
              v-model="success"
            >
              {{ $t("home.contactFormSuccess") }}
            </ve-alert>

            <ve-input-text
              v-model.trim="$v.name.$model"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.name') | capitalize"
              :helper-text="errors.name"
              :type="
                errors.name !== null || $v.name.$error ? 'danger' : 'primary'
              "
              :disabled="loading"
            />

            <ve-input-text
              v-model.trim="$v.email.$model"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.email') | capitalize"
              :helper-text="errors.email"
              :type="
                errors.email !== null || $v.email.$error ? 'danger' : 'primary'
              "
              :disabled="loading"
            />

            <ve-input-textarea
              v-model.trim="$v.message.$model"
              :block="true"
              class="contact__form-control"
              :label="$t('dictionary.message') | capitalize"
              :helper-text="errors.message"
              :type="
                errors.message !== null || $v.message.$error
                  ? 'danger'
                  : 'primary'
              "
              :disabled="loading"
              :rows="4"
            />

            <div class="contact__recaptcha">
              <ve-spinner class="recaptcha-loader" v-show="recaptchaLoading" />
              <vue-recaptcha
                :sitekey="recaptcha_key"
                :loadRecaptchaScript="true"
                @render="recaptchaRendered"
                @verify="verifyRecaptcha"
                ref="recaptchaControl"
              />
              <span class="helper-text danger">{{ errors.recaptcha }}</span>
            </div>

            <ve-button @click="sendForm" :disabled="loading || $v.$invalid">
              <template slot="icon">
                <font-awesome-icon icon="paper-plane" v-show="!loading" />
                <font-awesome-icon
                  icon="circle-notch"
                  :spin="true"
                  v-show="loading"
                />
              </template>
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
import { namespace } from "vuex-class";
import config from "@/config";

import VueRecaptcha from "vue-recaptcha";

import LandingpageService from "@/services/landingpageService";
import VeContainer from "@/components/Grid/Container";
import VeInputText from "@/components/Input/Text";
import VeInputTextarea from "@/components/Input/Textarea";
import VeButton from "@/components/Button";
import VeAlert from "@/components/Alert";
import VeSpinner from "@/components/Spinner";

import { email, required, minLength } from "vuelidate/lib/validators";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SchemaInterface } from "@/store/landingpage/types";

library.add(faPaperPlane, faCircleNotch);

const landingpage = namespace("landingpage");

interface ErrorsInterface {
  name: string | null;
  email: string | null;
  message: string | null;
  recaptcha: string | null;
}

interface ErrorsResponseInterface {
  name: Array<string | null>;
  email: Array<string | null>;
  message: Array<string | null>;
  recaptcha: Array<string | null>;
}

@Component({
  name: "ViewPartialContact",
  components: {
    FontAwesomeIcon,
    VeAlert,
    VeButton,
    VeContainer,
    VeInputText,
    VeSpinner,
    VeInputTextarea,
    VueRecaptcha
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    message: {
      required,
      minLength: minLength(4)
    }
  }
})
export default class ViewPartialContact extends Vue {
  protected landingService = new LandingpageService();
  protected recaptcha_key: string = config("app.recaptchaKey");

  protected name: string | null = null;
  protected email: string | null = null;
  protected message: string | null = null;
  protected recaptcha: string | null = null;
  protected recaptchaLoading = true;
  protected loading = false;
  protected success = false;
  protected errors: ErrorsInterface = {
    name: null,
    email: null,
    message: null,
    recaptcha: null
  };

  public $refs!: { recaptchaControl: Vue & { reset: () => boolean } };

  @landingpage.State
  protected schema!: SchemaInterface;

  get contact() {
    return this.schema !== null ? this.schema.contact : null;
  }

  get background() {
    return this.schema.contact.background;
  }

  clearData() {
    this.$refs.recaptchaControl.reset();
    this.name = null;
    this.email = null;
    this.message = null;
    this.recaptcha = null;
    this.errors = {
      name: null,
      email: null,
      message: null,
      recaptcha: null
    };
  }

  recaptchaRendered() {
    this.recaptchaLoading = false;
  }

  showErrorMessage(errors: ErrorsResponseInterface) {
    if (errors.name) {
      this.errors.name = errors.name[0];
    }
    if (errors.email) {
      this.errors.email = errors.email[0];
    }
    if (errors.message) {
      this.errors.message = errors.message[0];
    }
    if (errors.recaptcha) {
      this.errors.recaptcha = errors.recaptcha[0];
    }
  }

  verifyRecaptcha(responseId: string) {
    this.recaptcha = responseId;
  }

  async sendForm() {
    this.loading = true;

    try {
      if (this.recaptcha === null) {
        this.showErrorMessage({
          name: [],
          email: [],
          message: [],
          recaptcha: ["El campo es invalido."]
        });
        this.loading = false;
        return;
      }

      if (this.name === null || this.email === null || this.message === null) {
        this.loading = false;
        return;
      }

      await this.landingService.contactForm(
        this.name,
        this.email,
        this.message,
        this.recaptcha
      );

      this.clearData();
      this.loading = false;
      this.success = true;
    } catch (e) {
      console.error("Error getting data from landingpage");
      console.error(e.status, e.statusText);

      this.showErrorMessage(e.data);
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
  position: relative;

  .dark & {
    background: darken($c-white, 90%);

    &__cover {
      background-color: $c-gray-darkest;
    }

    &__layer {
      background: rgba($c-gray-darkest, 0.6);
    }

    &__title,
    &__subtitle {
      color: $c-gray-lightest;
    }
  }

  &__cover {
    position: absolute;
    top: 0;
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
    background: rgba($c-gray-lighter, 0.6);
  }

  &__content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
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

  &__recaptcha {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $margin-lg;
  }

  &__form-control {
    margin-bottom: $margin-lg;
  }

  .helper-text {
    display: block;
    font-size: $font-xs;

    &.danger {
      color: $c-danger;
    }
  }

  .recaptcha-loader {
    color: $c-primary;
    width: 3rem;
  }
}
</style>
