import { ref, onServerPrefetch, onMounted } from 'vue';

const isMounted = ref(false);
const data = ref(null);

export function useFetchData() {
  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    // data.value = await fetchOnServer(/* ... */);
    data.value = 'serverFetch';
  });

  onMounted(async () => {
    // Toggle mounted to show we're in the client
    isMounted.value = true;

    // Artificial 1s delay to see the bug
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!data.value) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      // data.value = await fetchOnClient(/* ... */);
      data.value = 'clientFetch';
    }
  });

  return {
    isMounted,
    data,
  };
}
