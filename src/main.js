import Vue from "vue";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "bulma/css/bulma.min.css";
import "firebase/auth";
import "firebase/database";
import Vuefire from "vuefire";

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

Vue.use(Vuefire);

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
import dayjs from "dayjs";
Vue.prototype.db = {
  userId() {
    return firebase.auth().currentUser.uid;
  },
  db: firebase.database(),
  addGoal(goal) {
    return this.db.ref(`/user/${this.userId()}/goals`).push(goal);
  },
  getGoals() {
    return this.db.ref(`/user/${this.userId()}/goals`);
  },
  getGoal(id) {
    return this.db.ref(`/user/${this.userId()}/goals/${id}`);
  },
  removeGoal(id) {
    this.db.ref(`/goals/${id}`).remove();
    return this.db.ref(`/user/${this.userId()}/goals/${id}`).remove();
  },
  addRate(goal, date, rate, comment = "") {
    const sDate = dayjs(date);
    return this.db
      .ref(
        `/goals/${goal}/rates/${sDate.year()}/${sDate.month()}/${sDate.date()}`
      )
      .set({
        rate,
        comment
      });
  },
  getRates(goal, date) {
    const sDate = dayjs(date);
    return this.db.ref(`/goals/${goal}/rates/${sDate.year()}/${sDate.month()}`);
  },
  getRate(goal, date) {
    const sDate = dayjs(date);
    return this.db.ref(
      `/goals/${goal}/rates/${sDate.year()}/${sDate.month()}/${sDate.date()}`
    );
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
