import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

export function createAppRouter(isClient = false) {
    const history = isClient ? createWebHistory() : createMemoryHistory()
    return createRouter({
        history,
        routes,
      });
}