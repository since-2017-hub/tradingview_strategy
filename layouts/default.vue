<template>
  <div class="layout-root">
    <header class="header">
      <div class="brand">TradingView Strategy (MVP)</div>
      <nav class="header-nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/strategy">Strategy</NuxtLink>
        <NuxtLink to="/auth/login">Login</NuxtLink>
        <NuxtLink to="/auth/signup">Signup</NuxtLink>
      </nav>
    </header>

    <div class="body">
      <aside class="sidebar">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/strategy">Strategy Simulator</NuxtLink></li>
          <li><NuxtLink to="/auth/login">Login</NuxtLink></li>
          <li><NuxtLink to="/auth/signup">Signup</NuxtLink></li>
        </ul>
      </aside>

      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-root { display:flex; flex-direction:column; min-height:100vh; }
.header { display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#0f172a; color:#fff; }
.header .brand { font-weight:700 }
.header-nav a { color:#cbd5e1; margin-left:12px; text-decoration:none }
.body { display:flex; flex:1 }
.sidebar { width:220px; background:#0b1220; color:#cbd5e1; padding:16px }
.sidebar ul { list-style:none; padding:0; margin:0 }
.sidebar li { margin-bottom:8px }
.sidebar a { color:inherit; text-decoration:none }
.content { flex:1; padding:20px }
</style>
