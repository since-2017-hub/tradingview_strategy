import { ref } from 'vue'

const TOKEN_KEY = 'mvp_token'
const USERS_KEY = 'mvp_users'

export function useAuth(){
  const token = ref<string | null>(process.client ? localStorage.getItem(TOKEN_KEY) : null)

  function saveToken(t:string|null){
    token.value = t
    if (process.client){
      if (t) localStorage.setItem(TOKEN_KEY,t)
      else localStorage.removeItem(TOKEN_KEY)
    }
  }

  async function login({email,password}:{email:string,password:string}){
    // demo-only: accept any credentials and return a fake token
    await new Promise(r=>setTimeout(r,250))
    const fake = btoa(email+":"+Date.now())
    saveToken(fake)
    return fake
  }

  async function signup({email,password}:{email:string,password:string}){
    // demo-only: store user in localStorage
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
