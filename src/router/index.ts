import { createRouter, createWebHistory } from "vue-router";
import { Config } from "@/models/config";
import Home from "@/views/Home.vue";
import GameView from "@/views/Game.vue";
import PreviewReservations from "@/views/previews/PreviewReservations.vue";
import PreviewScorecard from "@/views/previews/PreviewScorecard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/play",
    name: "play",
    component: GameView,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: Home },
];

if (Config.debug) {
  routes.push({
    path: "/preview/reservations",
    name: "previewReservations",
    component: PreviewReservations,
  });

  routes.push({
    path: "/preview/scorecard",
    name: "previewScorecard",
    component: PreviewScorecard,
  });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
