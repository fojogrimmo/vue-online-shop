<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import CardList from '../components/CardList.vue'
const { addToCart, removeFromCart } = inject('cart')
const { addToFavorite, deleteFavoriteItem } = inject('favoritesActions')

const favorites = ref([])
const items = ref([])
const loading = ref(true)

const handleFavoriteAction = async (item) => {
  if (!item.isFavorite) {
    await fetchItems()
    await addToFavorite(item)
  } else {
    await deleteFavoriteItem(item)
    await fetchFavorites()
  }
}

const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
    console.log(item)
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

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('http://localhost:3000/api/favorites/')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.favorite_id
      }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(async () => {
  try {
    await fetchItems()
    const { data } = await axios.get('http://localhost:3000/api/favorites/')
    console.log(data)
    favorites.value = data.map((item) => ({
      ...item,
      isFavorite: true,
      favoriteId: item.favorite_id
    }))
    loading.value = false
  } catch (error) {
    console.log('Error:', error)
  }
})
</script>

<template>
  <div v-if="!loading" class="h-screen">
    <h1 class="text-3xl font-bold mb-10">Wishlist</h1>
    <CardList
      :items="favorites"
      @add-to-favorite="handleFavoriteAction"
      @add-to-cart="onClickAddCart"
    />
  </div>
  <div v-else class="h-screen">
    <div class="grid grid-cols-4 gap-5 w-fit m-auto">
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </div>
  </div>
</template>
