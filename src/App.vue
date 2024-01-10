<script setup>
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
// import Drawer from './components/Drawer.vue'

const items = [
  {
    id: 1,
    title: "Nike - Tiger Woods '13",
    subtitle: "Men's Golf Shoes",
    price: 239.99,
    imageUrl: '/items/sneakers-1.png'
  },
  {
    id: 2,
    title: 'Nike - Air Zoom Infinity Tour',
    subtitle: "Men's Golf Shoes",
    price: 104.97,
    imageUrl: '/items/sneakers-2.png'
  },
  {
    id: 3,
    title: "Nike - Air Max 1 '86 OG G",
    subtitle: "Men's Golf Shoes",
    price: 135.97,
    imageUrl: '/items/sneakers-3.png'
  },
  {
    id: 4,
    title: 'Nike - Air Sport 2',
    subtitle: 'Golf Bag',
    price: 147.47,
    imageUrl: '/items/bags-1.png'
  },
  {
    id: 5,
    title: 'Wilson - Nel Cart Bag',
    subtitle: 'Golf Bag',
    price: 137.21,
    imageUrl: '/items/bags-2.png'
  },
  {
    id: 6,
    title: 'Wilson - EXO Lite Stand Bag',
    subtitle: 'Golf Bag',
    price: 182.95,
    imageUrl: '/items/bags-3.png'
  },
  {
    id: 7,
    title: 'Nike - Dri-FIT Club',
    subtitle: "Kids' Unstructured Featherlight Cap",
    price: 24.99,
    imageUrl: '/items/caps-1.png'
  },
  {
    id: 8,
    title: 'Wilson - VISOR',
    subtitle: "Women's Cap",
    price: 30.99,
    imageUrl: '/items/caps-2.png'
  },
  {
    id: 9,
    title: 'Nike - Tour Classic 4',
    subtitle: "Men's Golf Glove",
    price: 34.99,
    imageUrl: '/items/caps-3.png'
  },
  {
    id: 10,
    title: 'Nike - Storm-FIT',
    subtitle: "Men's Golf Gloves",
    price: 54.99,
    imageUrl: '/items/gloves-1.png'
  },
  {
    id: 11,
    title: 'Nike - Tour Classic 4',
    subtitle: "Men's Golf Gloves (Left Regular)",
    price: 34.99,
    imageUrl: '/items/gloves-2.png'
  },
  {
    id: 12,
    title: 'Wilson - Grip Soft Glove',
    subtitle: "Women's Golf Glove",
    price: 18.29,
    imageUrl: '/items/gloves-3.png'
  },
  {
    id: 13,
    title: 'Wilson - D9 Forged',
    subtitle: 'Steel Irons',
    price: 731.81,
    imageUrl: '/items/irons-1.png'
  },
  {
    id: 14,
    title: "Wilson - D9 Women's Irons",
    subtitle: 'Steel Irons',
    price: 548.86,
    imageUrl: '/items/irons-2.png'
  },
  {
    id: 15,
    title: 'Wilson - Staff Model',
    subtitle: 'Steel Irons',
    price: 799.99,
    imageUrl: '/items/irons-3.png'
  },
  {
    id: 16,
    title: 'Nike -  Zoom Metcon Turbo 2',
    subtitle: "Men's Workout Shoes",
    price: 79.97,
    imageUrl: '/items/sneakers-4.png'
  }
]
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-white shadow-xl mt-14">
    <Header />

    <div class="relative items-center">
      <img class="m-auto min-w-full px-16" src="/cover.jpg" alt="Cover image" />
      <div class="absolute top-20 left-20 p-20 w-3/5 pr-96">
        <h2
          class="mb-5 text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-slate-100 to-zinc-500"
        >
          More than just a game. <br />
          It's a lifestyle.
        </h2>
        <p class="mb-8 text-2xl text-white pr-2 font-thin">
          Whether you're just starting out, have played your whole life, or you're a Tour pro, your
          swing is like a fingerprint.
        </p>
        <button>Shopping Now</button>
      </div>
    </div>

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

      <CardList :items="items" />
    </div>
  </div>
</template>
