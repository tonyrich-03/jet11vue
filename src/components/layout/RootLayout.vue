<template>
    <div>
      <Navbar />
      <div class="container2">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../Navbar.vue'
  
  export default {
    components: {
      Navbar
    }
  }
  </script>
  
  <style scoped>
  .container2 {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
 </style>