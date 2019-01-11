<template>
  <div id="auth">
    <form @submit.prevent="submit">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="email" placeholder="Email" v-model="email">
          <span class="icon is-small is-left">
            📧
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            🔑
          </span>
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <input type="submit" class="button is-success" value="Login">
        </p>
        <p class="control">
          <button class="button is-text" @mousedown="signin">Sign in</button>
        </p>
        <p class="control">
          <button class="button is-text" @mousedown="reset">Reset password</button>
        </p>
      </div>
      <div v-if="error" class="notification is-danger">
        {{error.message}}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    submit() {
      this.auth.login(this.email, this.password).then(() => {
        this.$router.push({
          name: "home"
        });
      })
      .catch(error => {
        this.error = error;
      });
    },
    signin() {
      this.auth.signin(this.email, this.password).then(() => {
        this.$router.push({
          name: "home"
        });
      })
      .catch(error => {
        this.error = error;
      });
    },
    reset() {
      this.auth.resetPass(this.email).catch(error => {
        this.error = error;
      });
    }
  }
};
</script>

<style scoped>
#auth {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
</style>