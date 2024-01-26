<script setup>
import { ref, watch, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() =>
  Number(cartItems.value.reduce((acc, items) => acc + items.price, 0).toFixed(2))
)

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
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
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" />
  <div class="bg-white w-4/5 h-auto m-auto rounded-xl shadow-white shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="m-4 p-5">
      <router-view></router-view>
    </div>
  </div>
</template>
