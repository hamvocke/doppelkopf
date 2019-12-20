import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";

Vue.use(VueRouter);

const routes = [
  { path: '*', redirect: '/' }, // catch-all route
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/play",
    name: "play",
    component: Game
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
