import firebase from 'firebase'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer } from 'react'
import { auth, db } from './firebase'
import { initialState } from './initialState'

export const useUserState = () => {
  const router = useRouter()
  const [user, setUser] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState.user
  )

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(({ uid }) => {
      if (!uid) {
        router.push('/signup')
        return
      }

      db.doc(`users/${uid}`)
        .collection('contacts')
        .onSnapshot((s) => {
          const items = _.map(s.docs, (doc) => {
            return { id: doc.id, ...doc.data() }
          })
          const data = { uid: uid, contacts: items }
          setUser(data)
        })
    })

    return () => unsub()
  }, [auth])

  return _.defaults({
    user,
    setUser,
  })
}
