<script setup>
defineProps({
  title: String,
  subtitle: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  isHot: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative w-72 bg-white border border-slate-100 rounded-b-lg cursor-pointer transition hover:-translate-y-2 hover:shadow"
  >
    <div class="flex justify-between">
      <span v-if="isHot" class="absolute top-6 left-5 bg-white font-bold p-1 px-3 rounded-lg"
        >HOT</span
      >
      <button>
        <img
          :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
          alt="Like 1"
          class="absolute top-6 right-5 scale-125"
          @click="onClickFavorite"
        />
      </button>
    </div>

    <img :src="imageUrl" alt="Sneakers" />

    <div class="p-2">
      <p class="font-medium mt-1">{{ title }}</p>
      <div class="flex justify-between mb-4">
        <div class="flex flex-col justify-between">
          <p>{{ subtitle }}</p>
          <span class="font-medium absolute bottom-2">&#8364;{{ price }}</span>
        </div>
        <button>
          <img
            @click="onClickAdd"
            :src="!isAdded ? '/plus.svg' : 'checked.svg'"
            alt="Plus"
            class="scale-125 mr-4 mt-5"
          />
        </button>
      </div>
    </div>
  </div>
</template>
