<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5 w-fit m-auto">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :subtitle="item.subtitle"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isHot="item.id < 9"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
