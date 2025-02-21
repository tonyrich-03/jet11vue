<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue'; // Import computed

export default {
  setup() {
    const route = useRoute();
    const showNav = computed(() => route.path !== "/test"); // Hides nav on "/test"
    

    return { showNav };
  }
};
</script>
