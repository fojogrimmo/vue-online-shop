<script setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})

</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-32 h-auto" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-4 flex-1">
        <b>&#8364;{{ price }}</b>
        <img
          @click="emit('onClickRemove')"
          class="float-right opacity-70 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Delete item"
        />
      </div>
    </div>
  </div>
</template>
