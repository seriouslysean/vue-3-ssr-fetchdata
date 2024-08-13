<script setup>
import { ref } from 'vue';

const count = ref(1);
const handleIncrement = () => {
  count.value += 1;
};
</script>

<template>
  <div class="app">
    <h1>Vue 3 SSR - fetchData ({{ $route.path }})</h1>

    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>

    <p>There are some bugs with the routing operations. Going from Home <> About still needs to reset the data. As-is, the static single home load will showcase the bug properly but there are still issues to solve.</p>

    <router-view></router-view>

    <hr />

    <div class="section">
      <h2>Verify Hydration Works</h2>
      <button @click="handleIncrement">{{ count }}</button>
    </div>
  </div>
</template>

<style>
.section {
  border: 1px solid #000;
  padding: 1em;
  margin: 1em 0;
}

pre {
  padding: 1em;
  margin: 1em 0;
  background: lightgrey;
}
</style>
