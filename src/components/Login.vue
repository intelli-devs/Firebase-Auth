<template>
  <h2>
    {{ header }}
  </h2>
  <form id="login" @submit.prevent="login">
    <div><input
      name="login_email"
      v-model="email"
      id="login_email"
      type="text"
      placeholder="Enter your email"
    /></div>
  
    <div><input
      name="login_password"
      v-model="password"
      id="login_password"
      type="password"
      placeholder="Enter your password"
    /></div>
    <button  class="btn">Login</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { auth } from "@/firebase";
import {
  showAlert, showError
} from '@/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      header: "Login Form",
    };
  },
  methods: {},

  setup(props, {emit}) {
    const email = ref("");
    const password = ref("");
    const login = () => {
      const form = document.querySelector("#login");
      try {
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            form.reset();
            emit('close')
            showAlert(cred.user.email + " signedIn");
          })
          .catch((err) => {
            showError(err.message);
          });
      } catch (error) {
        showError(error.message);
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