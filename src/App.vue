<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="bg-white w-4/5 m-auto h-screen rounded-xl shadow-white shadow-xl mt-14">
    <Header />

    <div>
      <div
        class="relative m-10 border border-slate-100 rounded-b-lg cursor-pointer transition hover:-translate-y-2 hover:shadow"
      >
        <div class="flex justify-between">
          <span class="absolute top-6 left-8 bg-white font-bold">HOT</span>
          <img src="/like-2.svg" alt="Like 1" class="absolute top-0 right-2" />
        </div>

        <img src="/items/sneakers-1.png" alt="Sneakers" />

        <div class="p-2">
          <button>Add to cart</button>
          <p class="font-medium mt-1">Nike - Tiger Woods '13</p>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <p>Men's Golf Shoes</p>
              <span class="font-medium mt-4">&#8364;1111</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
