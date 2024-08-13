<script setup>
import { useFetchData } from '../composables/use-fetch-data';
import { useFetchDataWithStore } from '../composables/use-fetch-data-with-store';

const ufdResults = useFetchData();
const ufdwsResults = useFetchDataWithStore();
</script>

<template>
  <div class="app">
    <h2>About Page</h2>

    <div class="section">
      <h3>useFetchData (bug)</h3>
      <p>
        The <strong>useFetchData</strong> composable will fetch artificial data
        on the server and then on the client. The purpose of this demo is to
        show that the Vue SSR documentation contains incorrect information. As
        it stands, I've added a <strong>1s</strong> delay to show the data is
        null, and then replaced by the client data. In a perfect world, the
        server data would persist but that would require the use of a data store
        and to hydrate it to the client.
      </p>
      <pre>data: {{ ufdResults.data }}</pre>
    </div>

    <div class="section">
      <h3>useFetchDataWithStore (fixed)</h3>
      <pre>data: {{ ufdwsResults.data }}</pre>
    </div>
  </div>
</template>