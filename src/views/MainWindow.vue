<template>
  <div class="main-container">
    <div class="logo-container">
      <div class="avatar-box">
        <img :src="Avatar" width="180" height="180" class="logo" />
      </div>
    </div>
    <ShowResult />
    <InputForm class="input-form"/>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@assets/images/avatar.jpeg';
</script>

<style scoped lang="scss">

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 220px;
}
.logo-container {
  .avatar-box {
    .logo {
      width: 180px;
      height: 180px;
      // margin: 0 auto;
      border-radius: 50%;
      transition: all ease-in-out 0.3s;

      &:hover {
        box-shadow: 0 0 2em #8e91d4b5;
        transform: rotate(30deg);
      }
    }
  }
}

.input-form {
  margin-top: 20px;
}
</style>
