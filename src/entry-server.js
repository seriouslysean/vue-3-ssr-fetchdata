import { renderToString } from 'vue/server-renderer';

import { createApp } from './main';

/**
 * initiate the Vue App for a server-side application,
 * we use renderToString to render the app to HTML,
 * which can be sent from the server to the cleint
 */

export const render = async () => {
  const { app, pinia } = createApp();
  const html = await renderToString(app);

  const initialState = JSON.stringify(pinia.state.value);

  return {
    html,
    initialState,
  };
};
