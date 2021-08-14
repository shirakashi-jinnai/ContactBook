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
      const unsub = db
        .doc(`users/${uid}`)
        .collection('contacts')
        .onSnapshot((s) => {
          const items = _.map(s.docs, (doc) => {
            return { id: doc.id, ...doc.data() }
          })
          setUser({ uid: uid, contacts: items })
        })
      setInitializing(false)
      return () => unsub()
    })
  }, [auth])

  return {
    initializing,
    user,
    setUser,
  }
}
