import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';

import { createAppRouter } from './router';

import App from './App.vue';

export const createApp = (isClient = false) => {
  /**
   * use createSSRApp to render the Vue App in the server
   * and send it to the user to do hydration process
   */
  const pinia = createPinia();
  const router = createAppRouter(isClient);
  const app = createSSRApp(App);

  // Add vue router
  app.use(router);

  // Add pinia
  app.use(pinia);

  if (isClient) {
    pinia.state.value = JSON.parse(window.__pinia);
  }

  return {
    app,
    pinia,
    router,
  };
};
