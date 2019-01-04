import Vue from "vue";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbx3TYURH7qLbBUBJShzDCpnTM4YKP5XU",
  authDomain: "puncher-3a600.firebaseapp.com",
  databaseURL: "https://puncher-3a600.firebaseio.com",
  projectId: "puncher-3a600",
  storageBucket: "puncher-3a600.appspot.com",
  messagingSenderId: "976735465243"
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(function(user) {
  store.commit("SET_USER", user);
});

Vue.prototype.auth = {
  client: firebase.auth(),
  login(email, password) {
    return this.client.signInWithEmailAndPassword(email, password);
  },
  logout() {
    return this.client.signOut();
  },
  signin(email, password) {
    return this.client.createUserWithEmailAndPassword(email, password);
  },
  resetPass(email) {
    return this.client.sendPasswordResetEmail(email);
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
