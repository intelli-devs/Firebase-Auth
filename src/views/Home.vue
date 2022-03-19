<template>
  <div class="home">
    <img alt="intelliDev" src="../assets/id.png" />
    <header class="header">
      <ul>
        <li class="container logged-out" @click="modal('login')">Login</li>
        <li class="container logged-out" @click="modal('signup')">Sign Up</li>
        <li class="container logged-in" @click="modal('admin')">Make admin</li>
        <li class="container logged-in" @click="modal('details')">
          Account Details
        </li>
        <li @click="logout" class="container logged-in">Logout</li>
      </ul>
    </header>
    <section>
      <!-- add Form -->
      <div class="logged-in updateSection">
        <h2>Add Document</h2>
        <form @submit.prevent="add" id="add">
         <div> <input type="text" placeholder="Title" name="title" id="title" /></div>
          <div><input
            type="text"
            placeholder="details"
            name="details"
            id="details"
          /></div>
          <p><button>Add Doc</button></p>
        </form>
      </div>

      <div class="viewDoc logged-in">
        <h2>Post</h2>
        <div id="post"></div>
        <div v-if="length">
          <div v-for="post in posts" :key="post" class="container">
            <h2>
              <div class="head">
                {{ post.title }}
              <button class="yellow"
                v-if="!editMode"
                @click="toggleEditForm(post)"
                style="float: right; cursor: pointer; border: 2px solid white"
              >
                Edit post
              </button>
              <button
                v-show="post.edit"
                @click="toggleEditForm(post, 'cancel')"
                style="float: right; cursor: pointer; border: 2px solid white"
              >Cancel edit
              </button>
              </div>
            </h2>
            <h4>Details: {{ post.details }}</h4>
            <!-- UpdateForm -->
            <div v-show="post.edit" class="updateForm">
              <h2>Update Document</h2>
              <form @submit.prevent="update(post.id)" id="update">
               <div> <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  id="title"
                /></div>
               <div> <input
                  type="text"
                  placeholder="details"
                  name="details"
                  id="details"
                /></div>
                <p><button>Update Doc</button></p>
              </form>
            </div>
            <!-- updateForm End -->
            <button @click="del(post.id)">Delete post</button>
          </div>
        </div>
      </div>
    </section>
    <Modal class="{test:showModal}" v-if="showModal" @close="close">
      <Login @close="close" v-if="loginModal"></Login>
      <Register  @close="close"  v-if="signupModal"></Register>
      <Admin  @close="close"  v-if="adminModal"></Admin>
      <AccountDetails v-if="detailsModal" :user="userCred" />
    </Modal>
  </div>
  <Footer/>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";
import AccountDetails from "@/components/AccountDetails.vue";
import Modal from "@/components/Modal.vue";
import Register from "@/components/Register.vue";
import Admin from "@/components/Admin.vue";
import { db, auth, showAlert, showError } from "@/firebase/index.js";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
// import AccountDetails from '../components/AccountDetails.vue';
export default {
  name: "Home",
  components: { Modal, Login, Register, Admin, AccountDetails, Footer },
  data() {
    return {
      showModal: false,
      loginModal: false,
      signupModal: false,
      adminModal: false,
      editMode: false,
      detailsModal: false,
      error: "",
      water:true,
    };
  },
  methods: {
    modal(type) {
      this.showModal = true;

      //this section disables scrolling
      console.log('Try to hide overflow')
      this.disableScrolling()

      switch (type) {
        case "login":
          this.signupModal = false;
          this.adminModal = false;
          this.detailsModal = false;
          this.loginModal = true;

          break;
        case "signup":
          this.detailsModal = false;
          this.adminModal = false;
          this.loginModal = false;
          this.signupModal = true;
          break;
        case "admin":
          this.detailsModal = false;
          this.loginModal = false;
          this.signupModal = false;
          this.adminModal = true;
          break;
        case "details":
          this.loginModal = false;
          this.signupModal = false;
          this.adminModal = false;
          this.detailsModal = true;
          break;
      }
    },

    // function to close modal
    close() {
      this.showModal = false;
      this.loginModal = false;
      this.signupModal = false;
      this.adminModal = false;
      this.detailsModal = false;
      this.enableScrolling()
    },
    //enable scrolling
    enableScrolling(){
        document.body.classList.remove('stop-scrolling')
    },

    //disable scrolling
    disableScrolling(){
      document.body.classList.add('stop-scrolling')
    }
    ,

    // toggleEditForm
    toggleEditForm(post, com) {
      if (com === "cancel") {
        post.edit = false;
        this.editMode = false;
        showAlert(`${post.edit} Toggle Function Hide`);
        return;
      }
      post.edit = true;
      this.editMode = true;
      showAlert(`${post.edit} Toggle Function show`);
    },
    show(){
      showAlert()
    },
    showError(){
      showError()
    }
  },
  beforeMount() {},
  mounted() {
    if(this.showModal){
      console.log('Try to hide overflow')
      const h = document.querySelector('.home')
      const n = document.getElementById('home')
      n.style.overflow = 'hidden'
      h.style.overflow = 'hidden'
    }
  },
  setup() {
    const length = ref(false);
    const posts = ref([]);
    const colRef = collection(db, "posts");
    const q = query(colRef, orderBy("createAt", "asc"));
    const userCred = ref({});

    //fetches documents from the firestore
    onSnapshot(q, (snap) => {
      posts.value = [];
      snap.docs.forEach((doc) => {
        posts.value.push({ ...doc.data(), id: doc.id });
      });
      length.value = true;
    });

    //authChange
    onAuthStateChanged(auth, (user) => {
      const loggedIn = document.querySelectorAll(".logged-in");
      const loggedOut = document.querySelectorAll(".logged-out");
      if (user) {
        userCred.value = user;
        loggedIn.forEach((item) => (item.style.display = "block"));
        loggedOut.forEach((item) => (item.style.display = "none"));
      } else {
        loggedIn.forEach((item) => (item.style.display = "none"));
        loggedOut.forEach((item) => (item.style.display = "block"));
      }
    });
    //authchange

    // selecting the addForm
    // <- Add document
    const add = () => {
      const addForm = document.querySelector("#add");
      const title = addForm.title.value;
      const details = addForm.details.value;
      const createAt = new Date();
      addDoc(colRef, {
        title,
        details,
        createAt,
      }).then(() => {
        addForm.reset();
      });
      showAlert(`Post ${title} created success`)
    };
    // -> End of add document

    // <- Update documents
    const update = (id) => {
      const updateForm = document.querySelector("#update");
      const title = updateForm.title.value;
      const details = updateForm.details.value;
      showAlert('In Edit mode')
      const editedAt = serverTimestamp();
      const docRef = doc(colRef, id);
      updateDoc(docRef, {
        title,
        details,
        editedAt,
      }).then(() => {
        showAlert("Updated")
        updateForm.reset();
        this.editMode = false;
      });
    };
    // -> End of update

    //<- Start of delete doc
    const del = (id) => {
      const docRef = doc(colRef, id);

      deleteDoc(docRef).then(() => {
          showAlert("Post Deleted")
      });
    };
    //<- End of delete doc

    //the auth part
    const logout = () => {
      try {
        signOut(auth);
        showAlert('user signed out')
      } catch (error) {
        showError(error.message);
      }
    };

    return { posts, add, length, update, del, logout, userCred };
  },
};
</script>
<style>
.updateSection{
  background: rgba(0, 0, 255, 0.089);
}
.container {
  box-decoration-break: 2px solid grey;
  padding: 1rem;
  /* border-right: 3px solid rgba(0, 0, 0, 0.322); */
  border-left: 3px solid rgba(220, 20, 60, 0.712);
  background: rgba(5, 19, 80, 0.178);
  gap: 2rem;
  max-width: 80%;
  min-width: 20ch;
  text-align: center;
  line-height: 5ch;
}
.container:hover{
  transition: all .3s;
  border-left: none;
  border-bottom: 2px solid #000;
  color:wheat;
  background: rgba(220, 20, 60, 0.712);
  border-radius: .5rem 0;
}
.container:active{
   border-radius: .5rem 0;
  transition: all .4s;
  border-left: none;
  color:wheat;
  background: rgba(15, 2, 5, 0.712);;
}
ul {
  display: grid;
  justify-content: space-evenly;
  /* align-items: center; */
  list-style-type: none;
  background: rgba(0, 0, 0, 0.068);
  padding: 1em;
}
li {
  cursor: pointer;
  margin-top: 10px;
  
}
.viewDoc .container {
  border: none;
  margin: 1em auto;
  display: block;
  background: #000;
  color: aliceblue;
  border-radius: 1em;
}
span {
  background: rgb(236, 228, 228);
  /* padding: .2em; */
  border-radius: 80%;
  width: 2ch;
  cursor: pointer;
}
.logged-in {
  display: none;
}
.logged-out {
  display: none;
}
.stop-scrolling{
  overflow: hidden;
  overflow: -moz-hidden-unscrollable;
}
.test{
  color: green;
  background: rgb(33, 19, 160);
}
</style>