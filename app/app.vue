<template>
  <div>
    <header>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/auth/login">Login</NuxtLink>
        <NuxtLink to="/auth/signup">Signup</NuxtLink>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/strategy">Strategy</NuxtLink>
      </nav>
    </header>

    <main style="padding:20px;min-height:calc(100vh - 64px)">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #0f172a;
}
.nav a {
  color: #cbd5e1;
  text-decoration: none;
}
.nav a.router-link-active {
  color: #fff;
  font-weight: 600;
}
main {
  padding: 1.5rem;
}
</style>