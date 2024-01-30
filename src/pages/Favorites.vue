<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const { addToFavorite, deleteFavoriteItem } = inject('favoritesActions')

const favorites = ref([])
const items = ref([])

const handleFavoriteAction = async (item) => {
  if (!item.isFavorite) {
    await addToFavorite(item)
  } else {
    await deleteFavoriteItem(item)
  }
}

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/products/')

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(async () => {
  try {
    await fetchItems()
    const { data } = await axios.get('http://localhost:3000/api/favorites/')
    favorites.value = data.map((item) => ({
      ...item,
      isFavorite: true,
      favoriteId: item.favorite_id
    }))
    console.log(data)
  } catch (error) {
    console.log('Error:', error)
  }
})
</script>

<template>
  <div class="h-screen">
    <h1 class="text-3xl font-bold mb-10">Wishlist</h1>
    <CardList
      :items="favorites"
      @add-to-favorite="handleFavoriteAction"
      @add-to-cart="onClickAddCart"
    />
  </div>
</template>
