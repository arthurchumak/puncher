<template>
  <div v-if="$store.state.auth.user">
    <div id="navbar">
      <a @mousedown="$router.push('/')">
        <span class="icon is-large">✊</span>
      </a>

      <div>
        <a @mousedown="$router.push({name: 'profile'})">
          <span class="icon is-large">☰</span>
        </a>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<style scoped>
#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
