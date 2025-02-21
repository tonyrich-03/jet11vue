<script setup>
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TodoList from '../components/TodoList.vue';

const search = ref('');
const filter = ref('All');
const currentPage = ref(1);
const isModalOpen = ref(false);
const newTodoTitle = ref('');
const newTodoCompleted = ref(false);
const todosPerPage = 8;
const queryClient = useQueryClient();

const router = useRouter();

// Function to fetch todos from API
const fetchTodos = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${todosPerPage}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

// Fetch Todos
const { data: todos, isLoading, error } = useQuery({
  queryKey: ['todos', currentPage],
  queryFn: fetchTodos,
  keepPreviousData: true,
});

const totalPages = computed(() => {
  if (!todos.value || todos.value.length === 0) return 1;
  return Math.ceil(200 / todosPerPage); // If using an API with total count, update this.
});

const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
  }
};

// **Mutations for Editing, Deleting, and Updating Todos**
const updateTodoMutation = useMutation({
  mutationFn: async ({ id, title }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error updating todo');
    return response.json();
  },
  onSuccess: (updatedTodo) => {
    queryClient.setQueryData(['todos', currentPage], (oldTodos) =>
      oldTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  },
});

const deleteTodoMutation = useMutation({
  mutationFn: async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting todo');
    return id;
  },
  onSuccess: (deletedId) => {
    queryClient.setQueryData(['todos', currentPage], (oldTodos) =>
      oldTodos.filter(todo => todo.id !== deletedId)
    );
  },
});

const toggleTodoMutation = useMutation({
  mutationFn: async (id) => {
    const todo = todos.value.find(t => t.id === id);
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: todo.title, completed: !todo.completed }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error updating completion status');
    return response.json();
  },
  onSuccess: (updatedTodo) => {
    queryClient.setQueryData(['todos', currentPage], (oldTodos) =>
      oldTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  },
});

// **Computed Properties**
const filteredTodos = computed(() => {
  if (!todos.value) return [];
  return todos.value.filter((todo) => {
    if (filter.value === 'Completed') return todo.completed;
    if (filter.value === 'Incomplete') return !todo.completed;
    return true;
  });
});

const searchedTodos = computed(() =>
  filteredTodos.value.filter((todo) => todo.title.toLowerCase().includes(search.value.toLowerCase()))
);

// **Event Handlers**
const handleUpdateTodo = (id, newTitle) => {
  updateTodoMutation.mutate({ id, title: newTitle });
};

const handleDeleteTodo = (id) => {
  deleteTodoMutation.mutate(id);
};

const handleToggleComplete = (id) => {
  toggleTodoMutation.mutate(id);
};
const createTodoMutation = useMutation({
  mutationFn: async (newTodo) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error creating todo');
    return response.json();
  },
  onSuccess: (newTodo) => {
    queryClient.setQueryData(['todos', currentPage], (oldTodos) => [
      newTodo,  // Add new todo at the top
      ...oldTodos
    ]);
    isModalOpen.value = false; // Close modal after success
    newTodoTitle.value = '';   // Reset input fields
    newTodoCompleted.value = false;
  },
});
const handleCreateTodo = () => {
  if (!newTodoTitle.value.trim()) {
    alert('Todo title cannot be empty');
    return;
  }

  createTodoMutation.mutate({
    title: newTodoTitle.value,
    completed: newTodoCompleted.value,
    userId: 1, // JSONPlaceholder requires a `userId`
  });
};

</script>

<template>
  <div class="gold">
    <div class="mainContainer">
      <div class="containerTwo">
       <ul class="nav-link">
         <li><button @click="router.push('/')">Home</button></li>
         <li><button @click="router.push('/error')">Not Found</button></li>
         <li><button @click="router.push('/test')">Test Error</button></li>
       </ul>
       <div class="container">
         <h1>Todo App</h1>
         <button class="get-started" @click="router.push('/test', { replace: true })">Get Started</button>
       </div>
      </div>
    </div>
    <h2 class="todo-list">Todos List</h2>
    <!-- Search & Add Todo -->
    <div class="input-button">
      <input v-model="search" class="search" type="text" placeholder="Search..." />

      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <h2>Create New Todo</h2>
          <label>
            Title:
            <input v-model="newTodoTitle" type="text" placeholder="Enter todo title..." />
          </label>
          <label class="mark-checkbok">
            <input v-model="newTodoCompleted" type="checkbox" />
            Mark as Completed
          </label>
          <div class="modal-actions">
            <button @click="handleCreateTodo">Create</button>
            <button @click="isModalOpen = false">Cancel</button>
          </div>
        </div>
      </div>

      <button class="add-todo" @click="isModalOpen = true">Add Todo</button>
    </div>
       <!-- Filter Buttons -->
    <div>
      <button class="blue" @click="filter = 'All'">All</button>
      <button class="blue" @click="filter = 'Completed'">Completed</button>
      <button class="blue" @click="filter = 'Incomplete'">Incomplete</button>
    </div>
    <!-- Error Handling -->
    <div v-if="error" class="error-message">
      <p>{{ error.message }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading">Loading todos...</div>

      <!-- Todo List -->
      <TodoList
        v-if="!isLoading && !error"
        :todos="searchedTodos"
        @deleteTodo="handleDeleteTodo"
        @toggleComplete="handleToggleComplete"
        @updateTodo="handleUpdateTodo"
      />
    <!-- Pagination -->
   <div class="pagination">
      <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} of {{ totalPages }}</span>
      <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
    <footer>
      <p>&copy;2024 Tonyrich03 Dev @ AltSchool Africa. All rights reserved.</p>
    </footer>
 </div>
 </template>

<style scoped>
.gold {
  background-color: rgb(255, 254, 254);
  padding: 0px 180px 10px 240px;
  font-family: Arial sans-serif;
  max-width: 80vw;
  width: 100%;
  margin-left: -175px;
}
.mainContainer {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(41, 44, 41);
  border-top: none;
  margin-left: 9px;
  width: 81.8vw;
  height: 5vh;
  position: sticky;
  top: 0;
  padding: 10px 40px 70px 20px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.containerTwo {
  width: 100%;
  margin: 10px auto;
}
.container2 h1 {
  font-size: 70px;
  font-weight: 500;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  gap: 10px;
}
ul li {
  display: flex;
}
ul li button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}
ul li button:hover {
  background-color: #0056b3;
}
.get-started {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 45px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
input {
  padding: 10px;
  width: 27.7vw;
  margin-right: 0px;
  border-radius: 5px;
  border: 1px solid blue;
  margin-top: 10px;
  box-shadow: 0.1px 1px 3px 0.1px;
  background-color: #ffffff;
}
input:focus {
  outline: none;
}
input::placeholder {
  color: rgb(129, 129, 129);
}
.todo-list {
  text-align: center;
  margin-top: 70px;
  font-size: 20px;
}
.add-todo {
  padding: 10px 20px;
  cursor: pointer;
  background-color: rgb(8, 8, 197);
  transition: background-color 0.3s;
  color: white;
  border: none;
  border-radius: 5px;
  width: 18%;
  margin-left: 15px;
}
button:hover {
  background-color: rgb(56, 56, 116);
  color: #ffffff;
}
.input-button {
  display: flex;
  align-items: center;
  gap: 20px;
  
}
.modal-button {
  cursor: pointer;
  background-color: rgb(8, 8, 197);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}
.mark-checkbok input{
    width: 14px;
}
.search {
  padding: 8px;
  margin-bottom: 10px;
  margin-left: 35px;
  width: 90vw;
  height: 60px;
  font-size: 24px;
  border-radius: 5px;
  box-shadow: 0.1px 1px 3px 0.1px;
  border: 1px solid blue;
  background-color: #ffffff;
}
.search:focus {
  outline: none;
}
.search::placeholder {
  color: rgb(129, 129, 129);
}
.blue {
  background-color: rgb(8, 8, 197);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-left: 36px;
  gap: 10px;
}
footer{
    text-align: center;
    margin-left: 50px;
}
@media (max-width: 768px) {
  .gold {
    padding: 0px 160px 10px 205px;
    margin-left: -284px;
    width: 88vw;  
  }
  .get-started {
    margin-left: 185px;
  }
   .todo-list {
    font-size: 20px;
    margin-left: 80px;
  }
  .nav-link {
    display: flex;
  }
  .add-todo {
    margin-top: 10px;
    width: 30%;
  }
  .search {
    width: 60vw;
  }
  .mainContainer {
    width: 90vw;
    margin-left: 15px;
  }
 
  .modal-overlay {
    width: 100%;
    height: 100%;
  }
  .modal-content {
    width: 85%;
  }
  .modal-actions {
    display: flex;
    justify-content: center;  

  }
  .mark-checkbok input{
    width: 14px;
  }
  button {
 background-color: #18259c;
 font-size: 18px;
 width: 27vw;
  }
  .input-button {
  display: flex;
  align-items: center;
  gap: 10px; 
}
}

@media (max-width: 1024px) {
  .gold {
    padding: 0px 190px 10px 235px;
    margin-left: -204px;
    width: 78vw;  
  }
  .get-started {
    margin-left: 155px;
  }
   .todo-list {
    font-size: 20px;
    margin-left: 80px;
  }
  .nav-link {
    display: flex;
  }
  .add-todo {
    margin-top: 10px;
    width: 30%;
  }
  .search {
    width: 60vw;
  }
  .mainContainer {
    width: 87vw;
    margin-left: 10px;
  }
 
  .modal-overlay {
    width: 100%;
    height: 100%;
  }
  .modal-content {
    width: 85%;
  }
  .modal-actions {
    display: flex;
    justify-content: center;  

  }
  .mark-checkbok input{
    width: 14px;
  }
  button {
 background-color: #18259c;
 font-size: 18px;
 width: 27vw;
  }
  .input-button {
  display: flex;
  align-items: center;
  gap: 10px; 
}
}
</style>
