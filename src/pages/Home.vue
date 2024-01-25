<script setup>
import { reactive, onMounted, watch, ref } from 'vue'
import axios from 'axios'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cartItems, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sort: 'default',
  searchQuery: ''
})

const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sort = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('http://localhost:3000/api/favorites/', obj)
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
  const localData = localStorage.getItem('cartItems')
  cartItems.value = localData ? JSON.parse(localData) : []
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
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
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCart" />
  </div>
</template>
