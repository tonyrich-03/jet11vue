<template>
    <div :style="{ padding: '20px', fontFamily: 'Arial, sans-serif' }">
      <h1>Todo Details</h1>
      <p v-if="error">{{ error }}</p>
      <p v-else-if="!todo">Loading...</p>
      <p v-else>
        <strong>Title:</strong> {{ todo.title }}<br />
        <strong>Status:</strong> {{ todo.completed ? 'Completed' : 'Incomplete' }}
      </p>
      <router-link to="/" :style="{ color: 'blue', textDecoration: 'none', display: 'block', marginTop: '10px' }">
        <button>Back to Todos</button>
      </router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const route = useRoute();
      const todo = ref(null);
      const error = ref(null);
      const { id } = route.params;
  
      onMounted(() => {
        axios
          .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then(response => {
            todo.value = response.data;
          })
          .catch(err => {
            console.error('Error fetching todo:', err);
            error.value = 'Failed to fetch todo details.';
          });
      });
  
      return { todo, error };
    }
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>