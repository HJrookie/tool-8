<script setup>
import GuaForm from "./components/Form.vue";
</script>

<template>
  <!-- <div class="gua-wapper">
    <div class="gua">
      <img src="../src/assets/1-avatar.jpeg" width="180" height="180" class="logo" />
      <gua-form></gua-form>
    </div>
  </div> -->
  <router-view/>
</template>

<style scoped>
.logo {
  /* margin-top: -60px; */
  margin: 0 auto;
  border-radius: 50%;
  transition: all ease-in-out 0.3s;
}
.logo:hover {
  box-shadow: 0 0 2em #8e91d4b5;
  /* rotate: degree(30); */
  transform: rotate(30deg);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.gua-wapper {
  display: flex;
  align-items: center;
  height: 100%;
  transition:  all ease-in-out 0.3s;
}
.gua{

}
</style>
