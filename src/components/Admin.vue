<template>
  <h2>{{header}}</h2>
  <form id="admin">
    <input
      name="admin_email"
      v-model="email"
      id="admin_email"
      type="text"
      placeholder="Enter user's email to make admin"
    />
    <p>Email: {{ email }} </p>
    <button class="btn">Make Admin</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    name:'Admin Access',
  
  data() {
    return {
      header: "Admin Acess",
    };
  },
  methods: {},

  setup() {
    const email = ref("");
    return {
      email,
    };
  },
};
</script>

<style>

</style>