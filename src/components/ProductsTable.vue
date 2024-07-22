<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import AddProductForm from '../components/AddProductForm.vue'

const products = ref([])
const isModalOpen = ref(false)
const authStore = useAuthStore()

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    if (response.ok) {
      products.value = await response.json()
    } else {
      console.error('Failed to fetch products')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      products.value = products.value.filter((product) => product.id !== productId)
    } else {
      console.error('Failed to delete product')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleProductAdded = () => {
  fetchProducts()
  closeModal()
}

onMounted(fetchProducts)
</script>

<template>
  <h2 class="text-2xl font-medium mb-6 text-black z-10">Products Table</h2>
  <div class="relative overflow-hidden rounded-lg w-auto p-4 mb-14 bg-gray-800">
    <table class="w-full text-sm text-left text-gray-400 z-10">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 text-2xl">ID</th>
          <th scope="col" class="px-6 py-3 text-2xl">Title</th>
          <th scope="col" class="px-6 py-3 text-2xl">Subtitle</th>
          <th scope="col" class="px-6 py-3 text-2xl">Price</th>
          <th scope="col" class="px-6 py-3 text-2xl">Image</th>
          <th scope="col" class="px-16 py-3 text-2xl">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="product.id"
          :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'"
        >
          <td class="text-2xl px-6 py-4 font-medium text-white hover:bg-gray-600">
            {{ product.id }}
          </td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ product.title }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ product.subtitle }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ product.price }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">
            <img
              :src="product.imageurl"
              alt="Product Image"
              class="w-20 h-20 object-cover m-auto"
            />
          </td>
          <td class="text-2xl px-6 py-8 hover:bg-gray-600 flex justify-between">
            <button
              @click="openModal"
              class="bg-emerald-400 hover:bg-emerald-500 text-black px-2 py-2 rounded-lg"
            >
              Add Product
            </button>
            <button @click="deleteProduct(product.id)" class="hover:opacity-75">
              <img src="/recycle-bin.png" alt="Delete item" class="w-10 h-10" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <button @click="closeModal" class="text-4xl float-right text-white mx-5 my-5">
          &times;
        </button>
        <add-product-form @productAdded="handleProductAdded"></add-product-form>
      </div>
    </div>
  </div>
</template>
