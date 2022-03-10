<template>
  <div class="home">
    <img alt="intelliDev" src="../assets/id.png" />
    <header class="header">
      <ul>
        <li class="container" @click="modal('login')">Login</li>
        <li class="container" @click="modal('signup')">Sign Up</li>
        <li class="container logged" @click="modal('admin')">Make admin</li>
        <li class="container" @click="modal('details')">Account Details</li>
        <li class="container" >Logout</li>
      </ul>
    </header>
    <section>
      <div class="addForm logged">
        <h2>Add Document</h2>
        <form @submit.prevent id="add">
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
      <div class="updateForm logged">
        <h2>Add Document</h2>
        <form @submit.prevent id="update">
          <input type="text" placeholder="Title" name="title" id="title" />
          <input
            type="text"
            placeholder="details"
            name="details"
            id="details"
          />
          <p><button>Update Doc</button></p>
        </form>
      </div>
      <div class="viewDoc">
        <h2>Post</h2>
        <div v-for="post in posts" :key="post">
          <div class="container post"> <h3> Title  <span @click="$emit('close')" id="closeModal" style="float: right">X</span> </h3> {{ post.title }} <h3>Details</h3> {{ post.details }}  </div>
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

export default {
  name: "Home",
  components: { Modal, Login, Register, Admin },
  data() {
    return {
      showModal: false,
      loginModal: false,
      signupModal: false,
      adminModal: false,
      posts: [
        { title: "Man of Action", details: "Lorem ipsum" },
        { title: "The outerSide", details: "Lorem ipsum" },
      ],
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
  },
  setup() {},
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
  max-width: fit-content;
  min-width: 15ch;
  text-align: center;
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
span{
  background: rgb(236, 228, 228);
  /* padding: .2em; */
  border-radius: 80%;
  width: 2ch;
  cursor: pointer;
}
 .viewDoc .container{
   width: 80vw;
   background: #000;
 }
</style>