<script setup>
defineProps({
  title: String,
  subtitle: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col text-center items-center w-72 mx-auto mt-24">
    <img height="80" width="80" :src="imageUrl" alt="Info icon" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="mt-2 text-gray-500">{{ subtitle }}</p>
  </div>
</template>
