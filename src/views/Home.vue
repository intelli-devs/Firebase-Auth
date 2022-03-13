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
      <div class="logged-in">
        <h2>Add Document</h2>
        <form @submit.prevent="add" id="add">
          <input type="text" placeholder="Title" name="title" id="title" />
          <input
            type="text"
            placeholder="details"
            name="details"
            id="details"
          />
          <p><button>Add Doc</button></p>
        </form>
      </div>

      <div class="viewDoc">
        <h2>Post</h2>
        <div id="post"></div>
        <div v-if="length">
          <div v-for="post in posts" :key="post" class="container">
            <h2>
              {{ post.title }}
              <h6
                v-if="!editMode"
                @click="toggleEditForm(post)"
                style="float: right; cursor: pointer; border: 2px solid white"
              >
                Edit post
              </h6>
              <h6
                v-if="post.edit"
                @click="toggleEditForm(post, 'cancel')"
                style="float: right; cursor: pointer; border: 2px solid white"
              >
                Cancel edit
              </h6>
            </h2>
            <h4>Details: {{ post.details }}</h4>
            <!-- UpdateForm -->
            <div v-show="post.edit" class="updateForm logged-in">
              <h2>Update Document</h2>
              <form @submit.prevent="update(post.id)" id="update">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  id="title"
                />
                <input
                  type="text"
                  placeholder="details"
                  name="details"
                  id="details"
                />
                <p><button>Update Doc</button></p>
              </form>
            </div>
            <!-- updateForm End -->
            <div @click="del(post.id)">Delete post</div>
          </div>
        </div>
      </div>
    </section>
    <Modal v-if="showModal" @close="close">
      <Login v-if="loginModal"></Login>
      <Register v-if="signupModal"></Register>
      <Admin v-if="adminModal"></Admin>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Admin from "@/components/Admin.vue";
import { db, auth } from "@/firebase/index.js";
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
import { signOut } from "firebase/auth";

import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
export default {
  name: "Home",
  components: { Modal, Login, Register, Admin },
  data() {
    return {
      showModal: false,
      loginModal: false,
      signupModal: false,
      adminModal: false,
      editMode: false,
      error: "",
    };
  },
  methods: {
    modal(type) {
      this.showModal = true;
      switch (type) {
        case "login":
          this.signupModal = false;
          this.adminModal = false;
          this.loginModal = true;
          break;
        case "signup":
          this.adminModal = false;
          this.loginModal = false;
          this.signupModal = true;
          break;
        case "admin":
          this.loginModal = false;
          this.signupModal = false;
          this.adminModal = true;
          break;
      }
    },
    close() {
      this.showModal = false;
      this.loginModal = false;
      this.signupModal = false;
      this.adminModal = false;
    },

    // toggleEditForm
    toggleEditForm(post, com) {
      if (com === "cancel") {
        alert("Toggle Function Hide");
        post.edit = false;
        this.editMode = false;
        return;
      }
      alert("Toggle Function Show");
      post.edit = true;
      this.editMode = true;
    },
  },
  beforeMount() {},
  mounted() {},
  setup() {
    const length = ref(false);
    const posts = ref([]);
    const colRef = collection(db, "posts");
    const q = query(colRef, orderBy("createAt", "asc"));

    //fetches documents from the firestore
    onSnapshot(q, (snap) => {
      posts.value = [];
      snap.docs.forEach((doc) => {
        posts.value.push({ ...doc.data(), id: doc.id });
      });
      length.value = true;
    });

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
      alert(`Post ${title} created success`);
    };
    // -> End of add document

    // <- Update documents
    const update = (id) => {
      const updateForm = document.querySelector("#update");
      const title = updateForm.title.value;
      const details = updateForm.details.value;
      alert("in function");
      const editedAt = serverTimestamp();
      const docRef = doc(colRef, id);
      updateDoc(docRef, {
        title,
        details,
        editedAt,
      }).then(() => {
        alert("Updated");
        updateForm.reset();
        this.editMode = false;
      });
    };
    // -> End of update

    //<- Start of delete doc
    const del = (id) => {
      const docRef = doc(colRef, id);

      deleteDoc(docRef).then(() => {
        alert("Post Deleted");
      });
    };
    //<- End of delete doc

    //the auth part
    const logout = () => {
      try {
        signOut(auth);
        alert("user signed out");
        alert(cred.user)
      } catch (error) {
        alert(error.message);
      }
      
    };

    return { posts, add, length, update, del, logout };
  },
};
</script>
<style>
.container {
  box-decoration-break: 2px solid grey;
  padding: 1rem;
  border-right: 3px solid rgba(0, 0, 0, 0.322);
  border-left: 3px solid rgba(0, 0, 0, 0.342);
  background: rgba(192, 187, 187, 0.178);
  gap: 2rem;
  max-width: 40%;
  min-width: 15ch;
  text-align: center;
  line-height: 5ch;
}
ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  background: rgba(0, 0, 0, 0.068);
  padding: 1em;
  /* width: 80vw; */
}
li {
  cursor: pointer;
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
</style>