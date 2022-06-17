import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("@/components/TutorialsList"),
  },
  // 로그인 관련 메뉴
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  // 프로필 관련 메뉴
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile"),
  },
  // 회원가입 관련 메뉴
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register"),
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("@/components/Tutorial"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/components/AddTutorial"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
