<template>
    <div
      :style="containerStyle"
    >
      <h1 :style="titleStyle">404 | Page Not Found</h1>
      <br />
      <p :style="messageStyle">Oops! Something went wrong. Please try again later.</p>
      <br />
      <button
        @click="goHome"
        :style="buttonStyle"
      >
        Go Back to Home Page
      </button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ErrorPage',
    setup() {
const router = useRouter();

const goHome = () => {
  router.push('/');
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
};

const titleStyle = {
  fontSize: '48px',
  color: '#dc3545',
  marginBottom: '20px',
};
const messageStyle = {
      fontSize: '18px',
      color: '#6c757d',
      marginBottom: '30px',
    };

    const buttonStyle = {
      marginBlock: '20px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    };

    return {
      goHome,
      containerStyle,
      titleStyle,
      messageStyle,
      buttonStyle,
    };
  },
};
</script>

<style scoped>
</style>