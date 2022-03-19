<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/rockmusic.png" />
      <h1>
        <router-link :to="{ name: 'home' }">Vue Music PlayList</router-link>
      </h1>
      <div class="links">
        <div v-if="user" class="user-links">
          <p>Rock On, {{ user.displayName }}!</p>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import useLogout from "../composables/useLogout";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    // Init user, router and logout
    const { user } = getUser();
    const router = useRouter();
    const { logout } = useLogout();

    const handleClick = async () => {
      await logout();
      console.log("logged out");
      router.push({ name: "login" });
    };
    return { handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: #ffc2e2;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 120px;
}
nav h1 {
  margin-left: 20px;
  text-shadow: 0px 3px 3px #4caf50;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
.user-links {
  display: flex;
  align-items: center;
  width: fit-content;
}
.user-links p {
  font-family: "Nunito", sans-serif;
  color: #7c8bff;
}
</style>
