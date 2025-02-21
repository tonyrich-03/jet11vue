<template>
  <ul class="good">
    <li class="todo-item" v-for="todo in todos" :key="todo.id">
      <div class="checkbox">
        <input type="checkbox" :checked="todo.completed" @change="() => $emit('toggleComplete', todo.id)" />
        <span v-if="todo.completed" class="checkmark"></span>
      </div>

      <div v-if="editingTodoId === todo.id" style="flex-grow: 1; margin-right: 10px">
        <input
          type="text"
          v-model="editValue"
          style="
            width: 100%;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: white;
          "
        />
      </div>
      <router-link
        v-else
        :to="'/todos/' + todo.id"
        :style="{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black',
          flexGrow: 1,
          marginRight: '10px',
          cursor: 'pointer',
        }"
      >
        {{ todo.title }}
      </router-link>

      <div class="actions">
        <template v-if="editingTodoId === todo.id">
          <button @click="handleSaveClick(todo.id)">Save</button>
          <button @click="handleCancelClick">Cancel</button>
        </template>
        <template v-else>
          <button @click="handleEditClick(todo)">Edit</button>
          <button @click="() => $emit('deleteTodo', todo.id)">Delete</button>
        </template>
      </div>
    </li>
  </ul>
    
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['deleteTodo', 'toggleComplete', 'updateTodo']);

const editingTodoId = ref(null);
const editValue = ref('');

const handleEditClick = (todo) => {
  editingTodoId.value = todo.id;
  editValue.value = todo.title;
};

const handleSaveClick = (id) => {
  if (!editValue.value.trim()) {
    alert('Title cannot be empty!');
    return;
  }
  emit('updateTodo', id, editValue.value.trim());
  editingTodoId.value = null;
  editValue.value = '';
};

const handleCancelClick = () => {
  editingTodoId.value = null;
  editValue.value = '';
};
</script>

<style scoped>
.good {
  background-color: rgb(240, 240, 240);
  padding: 10px 60px 10px 60px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  width: 92%;
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
}
.todo-item {
  cursor: pointer;
  transition: background-color 0.3s,
  color 0.3s;
  padding: 0.5em 3.0em;
  font-size: 1em;
  font-weight: 500;
  list-style-type: none;
  margin-left: -48px;
  border-radius: 5px;
  box-shadow: 0.1px 1px 3px 0.1px;
  width: 100%;
}
.checkbox {
 display: flex;
 align-items: center;
 width: 30%;
 height: 30%;
 margin-right: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-left: 850px;
}
.actions button {
  color: white;
  padding: 10px 20px;
}
.actions button:hover {
  background-color: #121cda;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
@media (max-width: 768px) {
  
  .checkbox {
  cursor: pointer;
  font-size: 1em;
}
  .todo-item {
    width: 73vw;
    font-size: 20px;
    margin-left: -58px;
  }
  .actions {
    margin-left: 170px;
  }
  button{
    background-color: #313aee;
  }
  .actions button:hover {
  background-color: #090f83;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
}
@media (max-width: 1024px) {  
  .checkbox {
    cursor: pointer;
    font-size: 1em;
    width: auto; /* Adjust for better fit */
  }

  .todo-item {
    width: 78.8vw; /* width for better spacing */
    font-size: 18px; 
    margin-left: -50px; 
    padding: 10px 15px; 
  }

  .actions {
    margin-left: 20px; 
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }

  button {
    background-color: #313aee;
    padding: 8px 16px; /* Adjust button size */
    font-size: 14px;
    border-radius: 5px;
  }

  .actions button:hover {
    background-color: #090f83;
  }

  button:focus,
  button:focus-visible {
    outline: none;
  }
}
</style>
