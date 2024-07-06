<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const title = ref('');
const subtitle = ref('');
const price = ref('');
const imageurl = ref('');

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore().token}`,
      },
      body: JSON.stringify({
        title: title.value,
        subtitle: subtitle.value,
        price: price.value,
        imageurl: imageurl.value,
      }),
    });

    if (response.ok) {
      alert('Product added successfully!');
      title.value = '';
      subtitle.value = '';
      price.value = '';
      imageurl.value = '';
    } else {
      console.error('Failed to add product');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-white mb-4">Add New Product</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="title" class="block text-white">Title</label>
          <input v-model="title" type="text" id="title" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
        </div>
        <div class="mb-4">
          <label for="subtitle" class="block text-white">Subtitle</label>
          <input v-model="subtitle" type="text" id="subtitle" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
        </div>
        <div class="mb-4">
          <label for="price" class="block text-white">Price</label>
          <input v-model="price" type="number" step="0.01" id="price" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
        </div>
        <div class="mb-4">
          <label for="imageUrl" class="block text-white">Image URL</label>
          <input v-model="imageurl" type="text" id="imageurl" class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" required>
        </div>
        <button type="submit" class="bg-emerald-400 text-black text-xl font-medium px-4 py-2 rounded hover:bg-emerald-500 transition">Add Product</button>
      </form>
    </div>
  </template>