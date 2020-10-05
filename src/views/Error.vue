<template>
  <div id="page">
    <h1>404</h1>
    <a @mousedown="$router.push('/')">Go back</a>
  </div>
</template>

<style scoped>
#page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
