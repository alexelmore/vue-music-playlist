import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// styles
import "./assets/main.css";
// import firebase auth service
import { projectAuth } from "./firebase/config";

// Variable that will hold our root app entrypoint
let app;

projectAuth.onAuthStateChanged(() => {
    // If we don't have a value for app, run the below code to init app
    if (!app) {
      app = createApp(App).use(router).mount("#app");
    }
  });