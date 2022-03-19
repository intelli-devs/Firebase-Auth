<template>
  <div class="footer">
  <h4 id="copyright">
    <div class="text">
     Copyright &copy; 2022 <strong>Fru Boris </strong>
      <p>All rights Reserved</p>
    </div>
  </h4>
  </div>
</template>
<style scoped>

.footer {
  margin: 0 0;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  width: 100%;
   background: rgb(5, 5, 5);
}

h3 {
  color: #33efbb;
}
#copyright {
  padding: 1em 0;
  color: rgba(255, 255, 255, 0.466);
  font-weight: 300;
  min-height: 10vh;
  float: center;
}
#copyright .text {
  width: 80vw;
 
}
strong {
  color: #33efbad2;
}
@media screen and (max-width: 640px) {
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding-top:em ; */
    /* max-height: 40px; */
    gap: 2em;
  }
  .footer .box {
    width: 80vw;
    padding: 0.5em 2em 22em 2em;
    word-wrap: break-word;
    line-height: 1.5em;
    padding: 0;
    text-align: center;
    /* justify-content: right; */
    max-height: max-content;
  }
}
@media screen and (min-width: 768px) {
  .footer .service .box {
    height: 20px;
    overflow: scroll;
  }
}

.footer .box {
  -ms-word-wrap: break-word;
  word-wrap: break-word;
  max-height: 25vh;
  overflow: auto;
}
</style>