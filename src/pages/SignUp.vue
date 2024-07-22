<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      is_admin: 'false'
    }
  },
  methods: {
    async signUp() {
      if (!this.name || !this.email || !this.password) {
        alert('All fields are required.')
        return
      }

      try {
        const response = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            is_admin: this.is_admin
          })
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        alert('User registered successfully')
      } catch (error) {
        console.error('Error:', error)
        alert('Error during registration')
      }
    }
  }
}
</script>

<template>
  <div class="bg-white h-screen"></div>
  <div
    class="backdrop-blur-sm bg-black/70 fixed top-0 left-0 h-full w-full flex items-center justify-center z-20 h-screen"
  >
    <div
      class="bg-white w-2/6 h-4/5 p-20 2xl:p-16 2xl:h-4/6 2xl:w-1/4 xl:p-12 xl:w-2/4 xl:h-2/3 rounded-3xl"
    >
      <h2 class="text-6xl font-bold mt-28 mb-16">Sing up</h2>
      <div>
        <p class="text-xl mb-4">Name</p>
        <input
          v-model="name"
          type="text"
          name="name"
          class="bg-green-100 w-full max-w-full h-12 mr-10 px-4 mb-4"
          placeholder="Your Name"
          required
        />

        <p class="text-xl mb-4">Email</p>
        <input
          v-model="email"
          type="email"
          name="email"
          pattern=".+@example\.com"
          class="bg-green-100 w-full max-w-full h-12 mr-10 px-4 mb-4"
          placeholder="test@gmail.com"
          required
        />

        <p class="text-xl mb-4">Password</p>
        <input
          v-model="password"
          type="password"
          name="password"
          class="bg-green-100 w-full max-w-full h-12 mr-10 px-4 mb-8"
          required
        />
      </div>
      <div class="flex flex-col items-center justify-center space-y-4">
        <div class="flex gap-5">
          <button
            @click="signUp"
            type="submit"
            class="text-white bg-emerald-400 text-black text-xl font-medium px-14 py-4 rounded-full hover:bg-emerald-500 transition mb-4"
          >
            Sing up
          </button>
          <router-link to="/">
            <button
              class="text-white bg-emerald-400 text-black text-xl font-medium px-14 py-4 rounded-full hover:bg-emerald-500 transition mb-4"
            >
              Exit
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
