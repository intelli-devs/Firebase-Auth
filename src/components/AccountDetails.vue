<template>
  <h2>Account Details</h2>
  <ul style="display: block">
    <li>User Name: {{ userName }}</li>
    <li>Bio: {{ bio }}</li>
  </ul>
</template>

<script>
import { ref } from "@vue/reactivity";
import { auth, db } from "@/firebase";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
export default {
  name: "Account Details",
  props: {
    user: {
      type: Object,
    },
  },
  setup(props) {
    const userName = ref("");
    const bio = ref("");
    props.user = null;
    if (props.user) {
      const uid = props.user.uid;
      onSnapshot(doc(db, "user", uid), (doc) => {
        let user = props.user.email;
        let arr = user.split("@", 1);
        userName.value = arr[0];
        bio.value = doc.data().bio;
      });
    } else {
      userName.value = "No User";
      bio.value = "Hence no bio";
    }

    return { userName, bio };
  },
};
</script>

<style>
</style>