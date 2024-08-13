<script setup>
import { ref } from 'vue';

import { useFetchData } from './composables/use-fetch-data';
import { useFetchDataWithStore } from './composables/use-fetch-data-with-store';

const ufdResults = useFetchData();
const ufdwsResults = useFetchDataWithStore();

const count = ref(1);
const handleIncrement = () => {
  count.value += 1;
};
</script>

<template>
  <div class="app">
    <h1>Vue 3 SSR - fetchData</h1>

    <div class="section">
      <h2>useFetchData (bug)</h2>
      <p>
        The <strong>useFetchData</strong> composable will fetch artificial data
        on the server and then on the client. The purpose of this demo is to
        show that the Vue SSR documentation contains incorrect information. As
        it stands, I've added a <strong>1s</strong> delay to show the data is
        null, and then replaced by the client data. In a perfect world, the
        server data would persist but that would require the use of a data store
        and to hydrate it to the client.
      </p>
      <pre>isMounted: {{ ufdResults.isMounted }}</pre>
      <pre>data: {{ ufdResults.data }}</pre>
    </div>

    <div class="section">
      <h2>useFetchDataWithStore (fixed)</h2>
      <pre>isMounted: {{ ufdwsResults.isMounted }}</pre>
      <pre>data: {{ ufdwsResults.data }}</pre>
    </div>

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
