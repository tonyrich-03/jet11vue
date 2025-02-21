<template>
    <div>Faulty Component</div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Intentionally throw an error when this component is rendered
      throw new Error("Test error: This is a simulated error for testing purposes.");
    }
  }
  </script>