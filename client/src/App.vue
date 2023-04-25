<script setup>
import Home from './components/Home.vue';
import LoginForm from './components/LoginForm.vue';
</script>

<template>
<div id="app">
  <router-view>
    <Home />
    <LoginForm />
  </router-view>
</div>
</template>
<style scoped>
body{
  margin: 0;
  padding: 0;
}
</style>

