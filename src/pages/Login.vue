<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const signIn = async () => {
  if (!email.value || !password.value) {
    alert('All fields are required.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert('Invalid email or password.');
      } else {
        throw new Error('Login failed');
      }
      return;
    }

    const data = await response.json();
    authStore.login(data.user, data.token);
    if (data.user.is_admin) {
      router.push('/admin_panel');
    } else {
      router.push('/user_account');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error during login');
  }
};
</script>


<template>
    <div class="bg-white h-screen"></div>
    <div class="backdrop-blur-sm bg-black/70 fixed top-0 left-0 h-full w-full flex items-center justify-center z-20 h-screen">
      <div class="bg-white w-2/6 h-4/5 p-20 rounded-3xl">
        <h2 class="text-6xl font-bold mt-28 mb-16">Sing in</h2>
        <div>
            <p class="text-xl mb-4">Email</p>
            <input 
            v-model="email"
            type="text" 
            class="bg-green-100 w-full max-w-full h-12 mr-10 px-4 mb-4"
            placeholder="test@gmail.com"
          />
          <p class="text-xl mb-4">Password</p>
            <input 
            v-model="password"
            type="password" 
            class="bg-green-100 w-full max-w-full h-12 mr-10 px-4 mb-8"/>
        </div>
        <div class="flex flex-col items-center justify-center space-y-4">
            <div class="flex gap-5">
                <button @click="signIn" class="text-white bg-emerald-400 text-black text-xl font-medium px-14 py-4 rounded-full hover:bg-emerald-500 transition mb-4">Sing in</button>
                <router-link to="/">
                    <button class="text-white bg-emerald-400 text-black text-xl font-medium px-14 py-4 rounded-full hover:bg-emerald-500 transition mb-4">Exit</button>
                </router-link>   
            </div>
            
            <div class="flex items-center space-x-2">
                <p class="text-xl text-slate-400">You don’t have an account?</p>
                <router-link to="/signup">
                    <button class="text-xl font-bold" >Sign up</button>
                </router-link>
            </div>
        </div>      
    </div>
</div>
</template>