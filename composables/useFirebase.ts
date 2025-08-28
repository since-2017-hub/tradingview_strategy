import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useRuntimeConfig } from 'nuxt/app'

export function useFirebase(){
  const config = useRuntimeConfig()
  const fb = config.public?.firebase || null
  if (!fb) {
    // no firebase configured
    return { db: null, auth: null }
  }
  if (!getApps().length) initializeApp(fb)
  const db = getFirestore()
  const auth = getAuth()
  return { db, auth }
}
