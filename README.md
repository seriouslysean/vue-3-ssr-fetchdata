# Vue 3 SSR - fetchData

This repo uses two composables to show that **serverPrefetch** does not work as written in the Vue documentation. The way to fix it is to use **Pinia** and a store to persist the data. Additionally, it addresses the issue of clearing the data and refetching it when the route changes.
