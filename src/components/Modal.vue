<template>
  <div id="modal">
    <div class="dark_bg"></div>
    <div class="content">
      <div class="header">
        
       <span @click="$emit('close')" id="closeModal" style="float: right">X</span>
      <!-- <h2>{{title}}</h2> -->
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props:{
    title:{
      type:String,
      default: "Form"
    }
  },
  setup(props) {
    onMounted(() => {
      const closeModal = document.querySelector("#closeModal");
      closeModal.addEventListener("click", () => {
        // closeModal.style.display = "none";
        const modal = document.getElementById('modal')
        modal.style.display = 'none'
      });
    });
  },
};
</script>

<style scoped>


span {
    width: 1.5rem;
  border-radius: 100%;
  background: grey;
  padding: 0.3rem;
  background: rgb(223, 200, 200);
  color: rgb(243, 14, 14);
  cursor: pointer;
}
#modal {
  margin: 0 0;
}
.dark_bg {
  background: rgba(0, 0, 0, 0.87);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1;
}
.content {
  margin: 5em auto;
  padding: 1rem;
  border-radius: 1em;
  box-shadow: 4px 2px 10px;
  background: rgb(231, 227, 227);
  position: absolute;
  width: 70%;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  min-height: fit-content;
}
</style>