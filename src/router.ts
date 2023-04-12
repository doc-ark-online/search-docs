import {
  createRouter,
  createWebHashHistory,
  isNavigationFailure,
} from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: import("./views/Home.vue"),
    },
  ],
});

export default router;
