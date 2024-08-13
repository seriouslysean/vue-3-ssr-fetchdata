import { ref, onServerPrefetch, onMounted } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

export function useFetchData() {
    const data = ref(null);

    // Need an abstracted function so we only do this once
    async function fetchClientData() {
    // Artificial 1s delay to see the bug
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!data.value) {
            // if data is null on mount, it means the component
            // is dynamically rendered on the client. Perform a
            // client-side fetch instead.
            // data.value = await fetchOnClient(/* ... */);
            data.value = 'clientFetch';
        }
    }

    onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    // data.value = await fetchOnServer(/* ... */);
        data.value = 'serverFetch';
    });

    onMounted(async () => {
        await fetchClientData();
    });

    onBeforeRouteUpdate(async () => {
        await fetchClientData();
    });

    onBeforeRouteLeave(() => {
        console.log('[ufd]: setting data=null');
        data.value = null;
    });

    return {
        data,
    };
}
