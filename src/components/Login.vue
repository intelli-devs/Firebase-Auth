<template>
<h2>
    {{header}}
</h2>
  <form id="login" @submit.prevent="">
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
    return {
      email,
      password,
    };
  },
};
</script>

<style>
</style>