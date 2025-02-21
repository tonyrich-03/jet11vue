<template>
    <div class="pagination">
      <button
        class="pagination-btn"
        @click="handlePrevious"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="pagination-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="pagination-btn"
        @click="handleNext"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalTodos: {
        type: Number,
        required: true,
      },
      todosPerPage: {
        type: Number,
        required: true,
      },
      onPageChange: {
        type: Function,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalTodos / this.todosPerPage);
      },
    },
    methods: {
      handleNext() {
        if (this.currentPage < this.totalPages) {
          this.onPageChange(this.currentPage + 1);
        }
      },
      handlePrevious() {
        if (this.currentPage > 1) {
          this.onPageChange(this.currentPage - 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  