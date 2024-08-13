import { ref, onServerPrefetch, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import { useFetchDataStore } from '../stores/fetch-data';

export function useFetchDataWithStore() {
  const store = useFetchDataStore();
  const isMounted = ref(false);

  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    // data.value = await fetchOnServer(/* ... */);
    store.data = 'serverFetch';
  });

  onMounted(async () => {
    // Toggle mounted to show we're in the client
    isMounted.value = true;

    // Artificial 1s delay to see the bug
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!store.data) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      // data.value = await fetchOnClient(/* ... */);
      store.data = 'clientFetch';
    }
  });

  onBeforeRouteLeave(() => {
    console.log('[ufdws]: resetting store');
    store.$reset();
    data.isMounted = false;
  });

  return {
    isMounted,
    data: store.data,
  };
}
