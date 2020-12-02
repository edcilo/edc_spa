import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import app from "./app";
import landingpage from "./landingpage";
import StateInterface from "./types";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<StateInterface>({
  storage: window.localStorage
});

export default new Vuex.Store<StateInterface>({
  modules: { app, landingpage },
  plugins: [vuexLocal.plugin]
});
