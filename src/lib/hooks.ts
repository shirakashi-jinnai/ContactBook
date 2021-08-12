import firebase from 'firebase'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer } from 'react'
import { auth } from './firebase'
import { initialState } from './initialState'

export const useUserState = () => {
  const router = useRouter()
  const [user, setUser] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState.user
  )

  useEffect(() => {
    auth.onAuthStateChanged(({ uid }) => {
      console.log(uid)
      if (!uid) {
        router.push('/signup')
        return
      }
      const data = { uid: uid, contactList: [] }
      setUser(data)
    })
  }, [auth])

  return _.defaults({
    user,
    setUser,
  })
}
