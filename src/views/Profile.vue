<template>
  <section class="section">
    <div class="field">
      <label class="label">Почта</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" disabled :value="$store.state.auth.user.email">
      </div>
    </div>
    <button class="button" @mousedown="logout">Logout</button>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      this.auth.logout();
    }
  }
};
</script>
