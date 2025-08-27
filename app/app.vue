<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-slate-900 text-slate-200">
      <nav class="flex gap-4 p-4 max-w-6xl mx-auto">
        <NuxtLink class="hover:text-white" to="/">Home</NuxtLink>
        <NuxtLink class="hover:text-white" to="/auth/login">Login</NuxtLink>
        <NuxtLink class="hover:text-white" to="/auth/signup">Signup</NuxtLink>
        <NuxtLink class="hover:text-white" to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink class="hover:text-white" to="/strategy">Strategy</NuxtLink>
      </nav>
    </header>

    <main class="p-6 min-h-[calc(100vh-64px)] max-w-6xl mx-auto w-full">
      <NuxtPage />
    </main>
  </div>
</template>