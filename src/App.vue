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

    <p>
      This repo uses two composables to show that <strong>serverPrefetch</strong> does not work as written in the Vue documentation. The way to fix it is to use <strong>Pinia</strong> and a store to persist the data. Additionally, it addresses the issue of clearing the data and refetching it when the route changes.
    </p>

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
