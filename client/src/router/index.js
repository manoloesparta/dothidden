import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main_menu",
    component: () => import("../views/MainMenuView.vue"),
  },
  {
    path: "/lobby/:lobby_id?",
    name: "lobby",
    props: (route) => ({
      is_host: route.params.is_host,
      lobby_id: route.params.lobby_id,
    }),
    component: () => import("../views/LobbyView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
