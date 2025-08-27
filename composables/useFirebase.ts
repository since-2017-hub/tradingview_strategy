import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useRuntimeConfig } from '#imports'

export function useFirebase(){
  const config = useRuntimeConfig()
  const fb = config.public?.firebase || null
  if (!fb) {
    // no firebase configured
    return { db: null }
  }
  if (!getApps().length) initializeApp(fb)
  const db = getFirestore()
  return { db }
}
