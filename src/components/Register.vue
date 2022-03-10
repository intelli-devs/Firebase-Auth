<template>
<h2>{{header}}</h2>
  <form id="SignUp">
    <input
      name="Signup_email"
      v-model="email"
      id="signup_email"
      type="text"
      placeholder="Enter your email"
    />
    ....
    <input
      name="signup_password"
      v-model="password"
      id="signup_password"
      type="text"
      placeholder="Enter your password"
    />
    <p>Email: {{ email }} [] Password: {{ password }}</p>
    <button class="btn">signup</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    name:'SignUp Form',
  data() {
    return {
      header: "SignUp Form",
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