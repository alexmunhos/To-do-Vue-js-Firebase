<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="width-body">
    <Toast />
    <RouterView />
  </div>
</template>

<style>
body {
  font-family: 'Poppins', sans-serif;
}
</style>

<style scoped>
.width-body {
  width: 70%;
  margin: 0 auto;
}
</style>
