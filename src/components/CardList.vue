<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Added to cart')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5 w-fit m-auto">
    <Card
      title="Nike - Tiger Woods '13"
      imageUrl="/items/sneakers-1.png"
      :price="239.99"
      :onClickAdd="onClickAdd"
    />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
