<template>
  <h2>
    {{ header }}
  </h2>
  <form id="login" @submit.prevent="login">
    <input
      name="login_email"
      v-model="email"
      id="login_email"
      type="text"
      placeholder="Enter your email"
    />
    ....
    <input
      name="login_password"
      v-model="password"
      id="login_password"
      type="text"
      placeholder="Enter your password"
    />
    <p>Email: {{ email }} [] Password: {{ password }}</p>
    <button class="btn">Login</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      header: "Login Form",
    };
  },
  methods: {},

  setup() {
    const email = ref("");
    const password = ref("");
    const login = () => {
      const form = document.querySelector("#login");
      try {
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            form.reset();
            alert(cred.user.email + " signedIn");
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (error) {
        alert(error.message);
      }
    };
    return {
      login,
      email,
      password,
    };
  },
};
</script>

<style>
</style>