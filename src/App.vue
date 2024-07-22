<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])
const drawerOpen = ref(false)
const regOpen = ref(false)

const totalPrice = computed(() =>
  Number(cartItems.value.reduce((acc, items) => acc + Number(items.price), 0).toFixed(2))
)

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const closeRegForm = () => {
  regOpen.value = false
}

const openRegForm = () => {
  regOpen.value = true
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
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

const deleteFavoriteItem = async (item) => {
  try {
    if (item.isFavorite) {
      item.isFavorite = false

      await axios.delete(`http://localhost:3000/api/favorites/${item.favoriteId}`)
      item.favoriteId = null
    } else {
      await addToFavorite(item)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cartItems,
  () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  openRegForm,
  closeRegForm,
  addToCart,
  removeFromCart
})

provide('favoritesActions', {
  addToFavorite,
  deleteFavoriteItem
})
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" />
  <div class="bg-white w-4/5 h-auto m-auto rounded-xl shadow-white shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" @open-reg-form="openRegForm" />

    <div class="m-4 p-5">
      <router-view></router-view>
    </div>
  </div>
</template>
