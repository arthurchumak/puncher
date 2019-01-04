<template>
  <div>
  <form @submit.prevent="submit">
    <input type="email" v-model="email"/>
    <input type="password" v-model="password"/>
    <input type="submit" value="Login"/>
  </form>
  <button @mousedown="signin">Sign in</button>
  <button @mousedown="reset">Reset Password</button>
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
      this.auth.login(this.email, this.password);
    },
    signin() {
      this.auth.signin(this.email, this.password);
    },
    reset() {
      this.auth.resetPass(this.email);
    }
  }
};
</script>
