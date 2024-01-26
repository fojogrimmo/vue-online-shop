<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
const favorites = ref([])

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('http://localhost:3000/api/favorites/', obj)
      favorites.value.push(data)
      item.favoriteId = data.favorite_id
    } else {
      console.log('item is already in favorites')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// const onClickAddCart = async (item) => {
//   try {
//     if (!item.isAdded) {
//       // логика добавления в корзину
//     } else {
//     }
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

// const deleteFavoriteItem = async (item) => {
//   try {
//     item.isFavorite = false
//     await axios.delete(`http://localhost:3000/api/favorites/${item.favoriteId}`)
//     item.favoriteId = null
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/favorites/')
    favorites.value = data.map((item) => ({
      ...item,
      isFavorite: true
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
    <CardList :items="favorites" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCart" />
  </div>
</template>
