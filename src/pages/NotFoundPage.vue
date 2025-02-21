<template>
    <div>
      <h1>404 | Page Not Found</h1>
      <br />
      <button @click="goToHomepage">Go to homepage</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  export default {
    name: 'NotFoundPage',
    setup() {
      const router = useRouter();
  
      const goToHomepage = () => {
        router.push('/');
      };
  
      return {
        goToHomepage,
      };
    },
    };
    </script>
    <style scoped>
    h1 {
      font-size: 48px;
      color: #000000;
      text-align: center;
      margin-top: 15%;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      display: block;
      margin: 0 auto;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    </style>
