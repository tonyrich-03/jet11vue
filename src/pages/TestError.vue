<template>
  <div class="gold">
    <div v-if="errorMessage" class="error-container">
        <p class="error-message">{{ errorMessage }}</p>
        <button class="close-error" @click="clearError">Close</button>
      </div>
    
     <div :style="containerStyle">
       <h1 :style="titleStyle">Test Error</h1>
       <h2 :style="subtitleStyle">Oops! Something went wrong.</h2>
       <p>Error: This is an intentional error for testing the TestError message</p>
       <p> We are sorry for the inconvenience.</p>
       <button @click="goHome" :style="buttonStyle">Go back to homepage</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'TestError',
  setup() {
    const router = useRouter();
    const errorMessage = ref('');

    const goHome = () => {
      router.push('/');
    };

    const triggerError = () => {
      errorMessage.value = 'This is a test error! An error has occurred! Please try again later.';
    };

    const clearError = () => {
      errorMessage.value = '';
    };

    return {
      goHome,
      triggerError,
      clearError,
      errorMessage,
      containerStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      },
      titleStyle: {
        fontSize: "68px",
        fontWeight: "bold",
        color: "#dc3545",
        marginBottom: "20px",
      },
     
      subtitleStyle: {
        fontSize: "68px",
        fontWeight: "bold",
        color: "#dc4545",
        marginBottom: "20px",
      },
      buttonStyle: {
        marginBlock: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }
    };
  }
};
</script>

<style scoped>
.error-container {
  background-color: #ffcccc;
  color: #d8000c;
  padding: 10px;
  border: 1px solid #d8000c;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
}

.error-message {
  font-size: 16px;
}

.close-error {
  background-color: #d8000c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  margin-left: 10px;
}

.close-error:hover {
  background-color: #a00008;
}
</style>
