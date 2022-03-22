import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import CreatePlaylist from "../views/playlists/CreatePlaylist";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue"
import { projectAuth } from "@/firebase/config";

// Route guard for our user authorization
const requireAuth = (to, from, next) => {
  // Init user to the current user returned back from the Firebase object, projectAuth, currentUser method.
  let user = projectAuth.currentUser;

  // If the user is null, redirect them to the welcome page
  if (!user) {
    next({ name: "login" });
    return;
  }
  // If the user is not null, let them conintue to the chatroom page
  next();
  return;
};

// Route guard for users
const requireNoAuth = (to, from, next) => {
  // Init user to the current user returned back from the Firebase object, projectAuth, currentUser method.
  let user = projectAuth.currentUser;

  // If the user is not null, redirect them to the chatroom page
  if (user) {
    next({ name: "home" });
    return;
  }
  // If the user is null, let them conintue to the welcome page
  next();
  return;
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/playlists/create",
    name: "createPlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "playlistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
