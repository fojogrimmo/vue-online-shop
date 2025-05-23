<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
import ProductsInfoBlock from './ProductsInfoBlock.vue'

const props = defineProps({
  totalPrice: Number
})

const { cartItems } = inject('cart')

const isCreatingOrder = ref(false)
const isOrderCreated = ref(false)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('http://localhost:3000/api/orders/', {
      items: cartItems.value,
      totalPrice: props.totalPrice
    })

    cartItems.value = []
    isOrderCreated.value = true

    return data
  } catch (error) {
    console.log('Error:', error)
  } finally {
    isCreatingOrder.value = false
  }
}

const disabledButon = computed(() =>
  props.isCreatingOrder ? true : props.totalPrice ? false : true
)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white w-1/5 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHeader />

    <ProductsInfoBlock
      v-if="isOrderCreated"
      title="Success!"
      subtitle="Your items are on their way. Thank you for choosing us!"
      image-url="/order-success.png"
    />

    <ProductsInfoBlock
      v-if="!totalPrice && !isOrderCreated"
      title="Your bag is empty"
      subtitle="Fear not, have a look at our latest products and start shopping."
      image-url="/cart-empy.png"
    />

    <CartItemList />

    <div v-if="totalPrice" class="flex text-lg flex-col gap-2 mt-7">
      <div class="flex gap-2">
        <span>Delivery & Handling</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>Free</b>
      </div>

      <div class="flex text-xl gap-2">
        <span>Total</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>&#8364;{{ totalPrice}}</b>
      </div>

      <button
        :disabled="disabledButon"
        @click="createOrder"
        class="bg-emerald-400 mt-4 w-full rounded-xl py-3 disabled:bg-slate-300 text-white text-lg cursor-pointer hover:bg-emerald-500 active:bg-emerald-600 transition"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
