<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const name = ref('');
const email = ref('');
const password = ref('');
const isAdmin = ref(false);

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore().token}`,
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        is_admin: isAdmin.value,
      }),
    });

    if (response.ok) {
      alert('User added successfully!');
      name.value = '';
      email.value = '';
      password.value = '';
      isAdmin.value = false;
      emit('userAdded');
    } else {
      console.error('Failed to add user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="bg-gray-800 p-10 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-white mb-4">Add New User</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-white text-xl">Name</label>
        <input v-model="name" type="text" id="name" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-white text-xl">Email</label>
        <input v-model="email" type="email" id="email" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-white text-xl">Password</label>
        <input v-model="password" type="password" id="password" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
      </div>
      <div class="mb-4">
        <label for="isAdmin" class="block text-white text-xl">Admin</label>
        <input v-model="isAdmin" type="checkbox" id="isAdmin" class="form-checkbox text-gray-600">
      </div>
      <button type="submit" class="bg-emerald-400 text-black text-xl font-medium px-4 py-2 rounded hover:bg-emerald-500 transition">Add User</button>
    </form>
  </div>
</template>