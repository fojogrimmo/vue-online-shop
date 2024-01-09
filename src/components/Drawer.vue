<script setup>
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div class="fixed top-o left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white w-1/5 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHeader />

    <CartItemList />

    <div class="flex text-lg flex-col gap-2 mt-7">
      <div class="flex gap-2">
        <span>Delivery & Handling</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>Free</b>
      </div>

      <div class="flex text-xl gap-2">
        <span>Total</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>&#8364;1233</b>
      </div>

      <button
        class="bg-emerald-400 mt-4 w-full rounded-xl py-3 disabled:bg-slate-300 text-white text-lg cursor-pointer hover:bg-emerald-500 active:bg-emerald-600 transition"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
