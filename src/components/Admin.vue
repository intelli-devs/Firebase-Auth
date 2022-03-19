<template>
  <h2>{{header}}</h2>
  <h2>Sorry <div>Function Unavailble </div> </h2>
  <p>If your thinks this is a mistake, Contact the administration for more details</p>
  <form id="admin">
    <input disabled="disable"
      name="admin_email"
      v-model="email"
      id="admin_email"
      type="text"
      placeholder="Function disabled"
    />
    <p>Email: {{ email }} </p>
    <button disabled="disable" class="btn">Make Admin</button>
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