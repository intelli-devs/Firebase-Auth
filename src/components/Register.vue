<template>
  <h2>{{ header }}</h2>
  <form  @submit.prevent="signup" id="signup">
   <div>
      <input
      name="email"
      v-model="email"
      id="signup_email"
      type="text"
      placeholder="Enter your email"
    />
   </div>
  
    <div><input
      name="password"
      v-model="password"
      id="signup_password"
      type="password"
      placeholder="Enter your password"
    /></div>
    
    <button class="btn">signup</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import {auth, db, showAlert, showError} from '../firebase'
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

  setup(props, {emit}) {
    const email = ref("");
    const password = ref("");
    const signup = ()=>{
        const signupForm = document.querySelector('#signup')
        // showAlert('Registering...')
      
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((cred)=>{
          showAlert(cred.user.email+ ' successfully registered')
          const colRef = collection(db, 'user')
          const d = doc(colRef, cred.user.uid)
          setDoc(d, {
            id: cred.user.uid,
            bio: 'Remote programmer',
            createdAt: new Date()
          })
          .then(()=>{
           setTimeout(() => {
              showAlert( 'Success: Your Profile has been Created' )
           }, 2000);
          })
          .catch(err =>{
            showError(`Error in creating your profile: ${err.message}` )
          } )
          signupForm.reset()
          emit('close', 'signup')
        }).catch((err)=>{
          showError(` Error: ${err.message}`)
        })
    }

    return {
      signup, email,
        password
    };
  },
};
</script>