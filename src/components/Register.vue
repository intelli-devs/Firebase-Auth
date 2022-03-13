<template>
  <h2>{{ header }}</h2>
  <form  @submit.prevent="signup" id="signup">
    <input
      name="email"
      v-model="email"
      id="signup_email"
      type="text"
      placeholder="Enter your email"
    />
    ....
    <input
      name="password"
      v-model="password"
      id="signup_password"
      type="text"
      placeholder="Enter your password"
    />
    <p>Email: {{ email }} Password: {{ password }}</p>
    <button class="btn">signup</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import {auth, db} from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import {setDoc, collection, doc} from 'firebase/firestore'
export default {
  name: "SignUp Form",
  data() {
    return {
      header: "SignUp Form",
    };
  },
  methods: {},

  setup() {
    const email = ref("");
    const password = ref("");
    const signup = ()=>{
        const signupForm = document.querySelector('#signup')
        alert('Registering...')
      
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((cred)=>{
          alert(cred.user.email+ ' Successfully registered')
          const colRef = collection(db, 'user')
          const d = doc(colRef, cred.user.uid)
          setDoc(d, {
            id: cred.user.uid,
            bio: 'Remote programmer',
            createdAt: new Date()
          })
          .then(()=>{
            alert( 'User Doc Created Successfully' )
          })
          .catch(err =>{
            alert(`Error: ${err.message}` )
          } )
          signupForm.reset()
        }).catch((err)=>{
          alert(err.message)
        })
    }

    return {
      signup, email,
        password
    };
  },
};
</script>