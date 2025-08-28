import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useFirebase } from './useFirebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { ref as vueRef, onMounted, onBeforeUnmount } from 'vue'

const TOKEN_KEY = 'mvp_token'

export function useAuth(){
  const config = useRuntimeConfig()
  const apiBase = String(config.public?.apiBase || '')

  const { auth } = useFirebase()

  const token = ref<string | null>(process.client ? localStorage.getItem(TOKEN_KEY) : null)
  const currentUser = vueRef<User | null>(null)

  let unsub: (() => void) | null = null
  if (auth) {
    // set up listener to keep token in sync
    unsub = onAuthStateChanged(auth, async (u) => {
      currentUser.value = u as User | null
      if (u) {
        const id = await u.getIdToken()
        saveToken(id)
      } else {
        saveToken(null)
      }
    })
  }

  function saveToken(t:string|null){
    token.value = t
    if (process.client){
      if (t) localStorage.setItem(TOKEN_KEY,t)
      else localStorage.removeItem(TOKEN_KEY)
    }
  }

  async function login({email,password}:{email:string,password:string}){
    // If Firebase is configured, use Firebase Auth
    if (auth) {
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCred.user.getIdToken()
      saveToken(idToken)
      return idToken
    }

    // If an API base URL is configured, call the backend
    if (apiBase) {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/auth/login/`, {
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
    // Firebase signup
    if (auth) {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const idToken = await userCred.user.getIdToken()
      saveToken(idToken)
      return true
    }

    if (apiBase) {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/auth/signup/`, {
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
    if (auth) {
      signOut(auth)
    }
    saveToken(null)
  }

  function isAuthenticated(){
    return !!token.value
  }

  return { login, signup, logout, isAuthenticated, token, currentUser }
}
