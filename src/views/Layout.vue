<template>
  <div v-if="$store.state.auth.user">
    <div id="navbar">
      <div class="item">
        <a @mousedown="$router.push('/')">
          ChromDays
        </a>
      </div>

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
  font-size: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#navbar a {
  color: black;
}
.item {
  padding: 0px 0.5em;
}
</style>
