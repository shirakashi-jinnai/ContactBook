import firebase from 'firebase'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'
import { initialState } from './initialState'

export const useUserState = () => {
  const router = useRouter()
  const [initStatus, setInitStatus] = useState(true)
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
      setUser({ ...user, uid: uid })
      setInitStatus(false)
    })
  }, [auth])

  return _.defaults({
    initializing: initStatus,
    user,
    setUser,
  })
}
