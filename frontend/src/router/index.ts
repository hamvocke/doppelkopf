import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Tutorial from "@/views/Tutorial.vue";
import WaitingRoom from "@/views/WaitingRoom.vue";
import Preview from "@/views/Preview.vue";
import { Config } from "@/models/config";

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
  },
  {
    path: "/wait/:gameName",
    name: "waiting-room",
    component: WaitingRoom,
    props: true
  }
];

if (Config.debug) {
  routes.push({
    path: "/preview",
    name: "preview",
    component: Preview
  });
}

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
