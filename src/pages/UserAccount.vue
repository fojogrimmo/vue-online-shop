<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  window.location.href = '/';
};
</script>

<template>
    <div class="container mx-auto mt-10">
    <h1 class="text-3xl font-bold mb-16">Hi, {{ authStore.user?.name }}!</h1>
    <div class="flex flex-col items-center justify-center mb-52">
        <div class="relative inline-block mb-4">
            <img src="/pinia.png" alt="User avatar" class="w-48 h-48 rounded-full">
            <img src="/edit.png" alt="Edit avatar" class="absolute bottom-0 right-0 w-10 h-10 rounded-full transform translate-x-1/8 translate-y-1/6 cursor-pointer transition hover:-translate-y-1 hover:shadow">
        </div>
        
        <h2 class="text-3xl font-bold uppercase">{{ authStore.user?.name }}</h2>
        <p class="text-gray-400 font-light text-xl mb-4">{{ authStore.user?.email }}</p>
        <div>
            <div>
                <p class="font-bold mb-2">Orders</p>
                <div class="text-gray-400 border border-gray-300 rounded-lg p-2 inline-block w-60 mb-20">2 orders already</div>
            </div>
        </div>
        <button @click="logout" class="text-white bg-emerald-400 text-black text-xl font-medium px-14 py-4 rounded-full hover:bg-emerald-500 transition mb-4">Log Out</button>
    </div>
  </div>
</template>