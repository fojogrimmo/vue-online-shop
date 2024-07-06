<script setup>
import { reactive, onMounted, watch, ref, inject } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import HeaderItem from '../components/HeaderItem.vue'
import CardList from '../components/CardList.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const { cartItems, addToCart, removeFromCart } = inject('cart')

const items = ref([])
const loading = ref(true)

const { addToFavorite, deleteFavoriteItem } = inject('favoritesActions')

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

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const handleFavoriteAction = async (item) => {
  if (!item.isFavorite) {
    await addToFavorite(item)
    await fetchFavorites()
  } else {
    await deleteFavoriteItem(item)
    await fetchFavorites()
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
    loading.value = false
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
  <div v-if="!loading">
    <div class="mb-10">
      <HeaderItem />
    </div>

    <div class="flex justify-between items-center flex-col sm:flex-row mb-5 sm:mb-10">
      <h2 class="text-3xl font-bold mb-5 sm:mb-0">Best Sellers</h2>

      <div class="flex gap-2 mt-5 sm:mt-0">
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
      <CardList
        :items="items"
        @add-to-favorite="handleFavoriteAction"
        @add-to-cart="onClickAddCart"
      />
    </div>
  </div>
  <div v-else class="h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-fit m-auto">
      <SkeletonLoader v-for="n in 8" :key="n" />
    </div>
  </div>
</template>

