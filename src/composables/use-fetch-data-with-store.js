import { computed, onServerPrefetch, onMounted } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

import { useFetchDataStore } from '../stores/fetch-data';

export function useFetchDataWithStore() {
    const store = useFetchDataStore();

    const data = computed(() => store.data);

    // Need an abstracted function so we only do this once
    async function fetchClientData() {
    // Artificial 1s delay to see the bug
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!store.data) {
            // if data is null on mount, it means the component
            // is dynamically rendered on the client. Perform a
            // client-side fetch instead.
            // data.value = await fetchOnClient(/* ... */);
            store.data = 'clientFetch';
        }
    }

    onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    // data.value = await fetchOnServer(/* ... */);
        store.data = 'serverFetch';
    });

    onMounted(async () => {
        await fetchClientData();
    });

    onBeforeRouteUpdate(async () => {
        await fetchClientData();
    });

    onBeforeRouteLeave(() => {
        console.log('[ufdws]: resetting store');
        store.$reset();
    });

    return {
        data,
    };
}
