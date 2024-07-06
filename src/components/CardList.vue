<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid md:grid-cols-4 md:gap-5 sm:grid-cols-2 sm:gap-3 grid-cols-1 gap-2 w-full sm:max-w-screen-lg lg:max-w-screen-xl m-auto">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :subtitle="item.subtitle"
      :imageurl="item.imageurl"
      :price="item.price"
      :isHot="item.id < 9"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
