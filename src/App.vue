<script setup>
import { ref, reactive, onMounted, watch, provide } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import HeaderItem from './components/HeaderItem.vue'

// import Drawer from './components/Drawer.vue'

const items = ref([])
const filters = reactive({
  sort: 'default',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sort = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
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

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('http://localhost:3000/api/favorites/', obj)
      // await new Promise((resolve) => setTimeout(resolve, 500))
      await fetchFavorites()
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
    item.isFavorite = false
    await axios.delete(`http://localhost:3000/api/favorites/${item.favoriteId}`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    item.favoriteId = null
  } catch (error) {
    console.error('Error:', error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sort: filters.sort
    }

    if (filters.searchQuery) {
      params.title = filters.searchQuery
    }
    const { data } = await axios.get('http://localhost:3000/api/products/', { params })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      iAdded: false
    }))
  } catch (error) {
    console.error('Error:', error)
  }
}
onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)
provide('addToFavorite', addToFavorite)
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
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="default">Default</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="priceLowToHigh">Price Low to High</option>
          </select>

          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="Search" />
            <input
              @input="onChangeSearchInput"
              type="text"
              placeholder="Search..."
              class="p-2 pl-11 pr-4 border rounded-md outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      <div class="mt-10">
        <CardList :items="items" @addToFavorite="addToFavorite" />
      </div>
    </div>
  </div>
</template>
