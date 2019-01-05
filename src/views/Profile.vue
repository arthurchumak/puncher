<template>
  <div>
    {{$store.state.auth.user.email}}
    <button class="navbar-item" @mousedown="logout">Logout</button>
  </div>
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
