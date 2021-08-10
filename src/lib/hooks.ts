import firebase from 'firebase'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer } from 'react'
import { auth, db, storage } from './firebase'
import { initialState } from './initialstate'

const FIREBASE_DEFAULTS = {
  auth,
  db,
  storage,
}

export const useFirebase = () => {
  const router = useRouter()
  const [initStatus, setInitStatus] = useReducer(
    (state: object, dispatch: object) => _.assign({}, state, dispatch),
    initialState.user
  )

  const auth = firebase.auth()

  useEffect(() => {
    auth.onAuthStateChanged(({ uid }) => {
      console.log(uid)
      if (!uid) {
        router.push('/signup')
        return
      }
      const data = { isSignedin: true, uid: uid, contactList: [] }
      setInitStatus(data)
    })
  }, [auth])

  return _.defaults(
    {
      initStatus,
      setInitStatus,
    },
    FIREBASE_DEFAULTS
  )
}
