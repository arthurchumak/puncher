<template>
  <div id="app">
    <div v-if="st">
      <router-view/>
    </div>

    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
export default {
  data() {
    return {
      st: false
    };
  },
  beforeMount() {
    this.$router.push({name: 'loader'})
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  },
  watch: {
    user(user) {
      this.st = true;
      if (user) {
        this.$router.push({name: 'home'});
      } else {
        this.$router.push({name: 'login'});
      }
    }
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
