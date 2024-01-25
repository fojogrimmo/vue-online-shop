<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import HeaderItem from './components/HeaderItem.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])
const isCreatingOrder = ref(false)

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

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('http://localhost:3000/api/orders/', {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    cartItems.value = []

    return data
  } catch (error) {
    console.log('Error:', error)
  } finally {
    isCreatingOrder.value = false
  }
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
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    @create-order="createOrder"
    :is-creating-order="isCreatingOrder"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-white shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <HeaderItem />

    <div class="p-10 m-4">
      <router-view></router-view>
    </div>
  </div>
</template>
