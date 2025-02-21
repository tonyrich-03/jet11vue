<template>
    <div>
      <h1 v-if="hasError">Something went wrong.</h1>
      <slot v-else></slot>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hasError: false
      };
    },
    errorCaptured(error, vm, info) {
      this.hasError = true;
      console.log("ErrorBoundary caught an error", error, info);
      return false; // Prevents the error from propagating further
    }
  };
  </script>