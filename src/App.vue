<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import HeaderItem from './components/HeaderItem.vue'

// import Drawer from './components/Drawer.vue'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/products')
    console.log(data)
  } catch (e) {
    console.error('Error', e)
  }
})
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-white shadow-xl mt-14">
    <Header />
    <HeaderItem />

    <div class="p-10 m-4">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-10">Best Sellers</h2>

        <div class="flex gap-2">
          <select class="py-2 px-3 border rounded-md outline-none">
            <option>Default</option>
            <option>Price High to Low</option>
            <option>Price Low to High</option>
          </select>

          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="Search" />
            <input
              type="text"
              placeholder="Search..."
              class="p-2 pl-11 pr-4 border rounded-md outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      <div class="mt-10"><CardList :items="items" /></div>
    </div>
  </div>
</template>
