<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>


</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  width: 100%; 
  box-sizing: border-box;
  color: black;
  
}
body{
  /* background-color: rgb(103, 100, 100); */
}
</style>
