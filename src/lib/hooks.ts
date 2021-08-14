import firebase from 'firebase'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'
import { initialState } from './initialState'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState.user
  )

  useEffect(() => {
    auth.onAuthStateChanged(({ uid }) => {
      if (!uid) {
        router.push('/signup')
        return
      }
      const unsub = db.collection(`users/${uid}/contacts`).onSnapshot((s) => {
        const contacts = _.map(s.docs, (doc) => ({ id: doc.id, ...doc.data() }))
        setUser({ uid, contacts })
      })
      setInitializing(false)
      return () => unsub()
    })
  }, [])

  return {
    initializing,
    user,
    setUser,
  }
}
