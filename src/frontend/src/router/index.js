import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import Welcome from "../views/Welcome";
import Cart from "../views/Cart";
import Orders from "../views/Orders";
import ThanksOrder from "../views/ThanksOrder";
import Login from "../views/Login";
import Profile from "../views/Profile";

import jwt from "../services/jwt.service";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/pizza/:id",
    name: "Index-edit",
    component: Index,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutCart",
    },
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutAccount",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutAccount",
    },
  },
  {
    path: "/thanks-order",
    name: "ThanksOrder",
    component: ThanksOrder,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    if (jwt.getToken()) {
      next("/");
    }
  }

  if (!jwt.getToken() && to.name !== "Login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
