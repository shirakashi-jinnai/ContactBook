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
  const [state, dispatch] = useReducer(
    (state: object, dispatch: object) => _.assign({}, state, dispatch),
    initialState.user
  )

  const auth = firebase.auth()

  useEffect(() => {
    const listenAuthState = auth.onAuthStateChanged(({ uid }) => {
      if (uid) {
        const data = { isSignedin: true, uid: uid, contactList: [] }
        dispatch(data)
      } else {
        router.push('/signup')
      }
    })
    return listenAuthState
  }, [auth])

  return _.defaults(
    {
      state,
      dispatch,
    },
    FIREBASE_DEFAULTS
  )
}
