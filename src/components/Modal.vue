<template>
  <div id="modal">
    <div class="dark_bg"></div>
    <div class="content">
      <div class="header">
        <span id="x" style="float: right">X</span>
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
  props: {
    title: {
      type: String,
      default: "Form",
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      const closeModal = document.querySelector("#x")
      const closeM = document.querySelector(".dark_bg")
      closeModal.addEventListener("click", () => {
        close()
      });

      closeM.addEventListener("click", () => {
        close()
      });
       //close function within the modal
      const close = () => {
        emit('close')
        const modal = document.getElementById("modal");
        modal.style.display = "none"
      };
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
}
.dark_bg {
  background: rgba(0, 0, 0, 0.87);
  position: absolute;
  width: 100vw;
  height:300%;
  top: 0;
  /* margin-bottom:0; */
  z-index: 1;
}
.content {
  margin: 30% auto;
  padding: 1rem;
  border-radius: 1em;
  box-shadow: 4px 2px 10px;
  background: rgb(231, 227, 227);
  position: absolute;
  width: 30ch;
  z-index: 2;
  top: 0;
  align-self: start;
  left: 0;
  right: 0;
  min-height: fit-content;
  word-wrap: break-word;
  /* word-break: break-all; */
  overflow: hidden;
  overflow: -moz-hidden-unscrollable;
}
</style>