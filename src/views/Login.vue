<template>
  <div id="auth">
    <form @submit.prevent="submit">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="email" placeholder="Email" v-model="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
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
      <p>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      this.auth.login(this.email, this.password).then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },
    signin() {
      this.auth.signin(this.email, this.password).then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },
    reset() {
      this.auth.resetPass(this.email);
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
