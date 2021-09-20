import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Tutorial from "@/views/Tutorial.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/" }, // catch-all route
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/play",
    name: "play",
    component: Game
  },
  {
    path: "/learn",
    name: "tutorial",
    component: Tutorial
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
