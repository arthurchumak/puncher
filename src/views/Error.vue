<template>
  <div id="page">
    <div>
      <h1>Page {{$route.path}} does not exist</h1>
      <br>
      <a @mousedown="$router.push('/')">Go back</a>
    </div>
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
