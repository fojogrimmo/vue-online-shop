<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import CardList from '../components/CardList.vue'
import ProductsInfoBlock from '../components/ProductsInfoBlock.vue'
const { cartItems, addToCart, removeFromCart } = inject('cart')
const { deleteFavoriteItem } = inject('favoritesActions')

const favorites = ref([])
const items = ref([])
const loading = ref(true)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.item_id
      }
      item.isFavorite = true
      const { data } = await axios.post('http://localhost:3000/api/favorites/', obj)
      item.favoriteId = data.favorite_id
    } else {
      await deleteFavoriteItem(item)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const handleFavoriteAction = async (item) => {
  if (!item.isFavorite) {
    await addToFavorite(item)
  } else {
    await deleteFavoriteItem(item)
  }
}

const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
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
      favoriteId: item.favorite_id,
      item_id: item.item_id
    }))
    const localData = localStorage.getItem('cartItems')
    cartItems.value = localData ? JSON.parse(localData) : []
    loading.value = false
  } catch (error) {
    console.log('Error:', error)
  }
})
</script>

<template>
  <div v-if="!loading" class="h-screen">
    <h1 class="text-3xl font-bold mb-10">Wishlist</h1>

    <ProductsInfoBlock
      v-if="!favorites.length"
      title="Oops! You have no products in your wishlist"
      subtitle="Add a product to your wishlist so you don’t lose it"
      image-url="/broken-heart.png"
    />

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
