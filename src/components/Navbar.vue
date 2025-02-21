<template>
    <div class="navbar">
      <div class="container">
        <h1>Todo App</h1>
        <ul>
          <router-link to="/"><li><button>Home</button></li></router-link>
          <router-link to="/notfoundpage"><li><button>Not found</button></li></router-link>
          <router-link to="/testerror"><li><button>Test Error</button></li></router-link>
          <router-link to="/todos"><li><button>Todos</button></li></router-link>
        </ul>
      </div>
      <button class="get-started" @click="navigateToTestError">Get Started</button>
    </div>
  </template>
  
  <script>
import router from '@/router';

  export default {
    methods: {
      navigateToTestError() {
        this.$router.replace('/testerror');
      }
    }
  }
  </script>

<style>
/* Make sure to create this CSS file. */
</style>