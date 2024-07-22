<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import AddUserForm from '../components/AddUserForm.vue'

import ProductsTable from '../components/ProductsTable.vue'

const users = ref([])
const isModalOpen = ref(false)
const authStore = useAuthStore()

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    if (response.ok) {
      users.value = await response.json()
    } else {
      console.error('Failed to fetch users')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const toggleAdmin = async (userId, isAdmin) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}/admin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ is_admin: isAdmin })
    })
    if (!response.ok) {
      console.error('Failed to update admin status')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      users.value = users.value.filter((user) => user.id !== userId)
    } else {
      console.error('Failed to delete user')
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

const handleUserAdded = () => {
  fetchUsers()
  closeModal()
}

const logout = () => {
  authStore.logout()
}

onMounted(fetchUsers)
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6 text-black">Hi, Admin!</h1>
    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-4 text-lg font-semibold"
    >
      Log Out
    </button>
  </div>

  <h2 class="text-2xl font-medium mb-6 text-black">Users Table</h2>
  <div class="relative overflow-x-auto w-auto p-4 mb-14 rounded-lg">
    <table class="w-full text-sm text-left text-gray-400 rounded-lg overflow-hidden">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 text-2xl">ID</th>
          <th scope="col" class="px-6 py-3 text-2xl">Name</th>
          <th scope="col" class="px-6 py-3 text-2xl">Email</th>
          <th scope="col" class="px-6 py-3 text-2xl">Password</th>
          <th scope="col" class="px-6 py-3 text-2xl">Admin</th>
          <th scope="col" class="px-16 py-3 text-2xl">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user.id"
          :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'"
        >
          <td class="text-2xl px-6 py-4 font-medium text-white hover:bg-gray-600">{{ user.id }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ user.name }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ user.email }}</td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600">{{ user.password }}</td>
          <td class="text-2xl px-6 py-4 text-center hover:bg-gray-600">
            <input
              type="checkbox"
              :checked="user.is_admin"
              @change="toggleAdmin(user.id, $event.target.checked)"
              class="form-checkbox text-2xl"
            />
          </td>
          <td class="text-2xl px-6 py-4 hover:bg-gray-600 flex justify-between">
            <button
              @click="openModal"
              class="bg-emerald-400 hover:bg-emerald-500 text-black px-2 py-2 rounded-lg"
            >
              Add User
            </button>
            <button @click="deleteUser(user.id)" class="hover:opacity-75">
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
      <div class="p-4 rounded-lg shadow-lg w-full max-w-md">
        <button @click="closeModal" class="float-right mx-8 my-8 text-white text-3xl">
          &times;
        </button>
        <add-user-form @userAdded="handleUserAdded"></add-user-form>
      </div>
    </div>
  </div>

  <ProductsTable />
</template>
