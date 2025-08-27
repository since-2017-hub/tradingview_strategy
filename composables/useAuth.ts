import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

const TOKEN_KEY = 'mvp_token'

export function useAuth(){
  const config = useRuntimeConfig()
  const apiBase = String(config.public?.apiBase || '')

  const token = ref<string | null>(process.client ? localStorage.getItem(TOKEN_KEY) : null)

  function saveToken(t:string|null){
    token.value = t
    if (process.client){
      if (t) localStorage.setItem(TOKEN_KEY,t)
      else localStorage.removeItem(TOKEN_KEY)
    }
  }

  async function login({email,password}:{email:string,password:string}){
    // If an API base URL is configured, call the backend; otherwise use demo fallback
    if (apiBase) {
      const res = await fetch(`${apiBase.replace(/\/$/,'')}/auth/login/`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({detail:res.statusText}))
        throw new Error(err.detail || 'Login failed')
      }
      const body = await res.json()
      if (!body.token) throw new Error('No token returned')
      saveToken(body.token)
      return body.token
    }

    // demo fallback: accept any credentials and create a local token
    await new Promise(r=>setTimeout(r,200))
    const fake = btoa(email+":"+Date.now())
    saveToken(fake)
    return fake
  }

  async function signup({email,password}:{email:string,password:string}){
    if (apiBase) {
      const res = await fetch(`${apiBase.replace(/\/$/,'')}/auth/signup/`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({detail:res.statusText}))
        throw new Error(err.detail || 'Signup failed')
      }
      return true
    }

    // demo fallback: store user in localStorage
    const USERS_KEY = 'mvp_users'
    const usersRaw = process.client ? localStorage.getItem(USERS_KEY) : null
    const users = usersRaw ? JSON.parse(usersRaw) : []
    if (users.find((u:any)=>u.email===email)) throw new Error('User already exists')
    users.push({email,password})
    if (process.client) localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  }

  function logout(){
    saveToken(null)
  }

  function isAuthenticated(){
    return !!token.value
  }

  return { login, signup, logout, isAuthenticated, token }
}
