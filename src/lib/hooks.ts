import firebase from 'firebase'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'
import { initialState } from './initialState'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState
  )

  const { contacts } = user.user
  const { queryCondition, ageRangeCondition } = user.filterCondition

  const calcAge = (birthday: Date): number => {
    const Birthday = DateTime.fromISO(birthday)
    return Math.abs(Math.floor(Birthday.diffNow().as('years')))
  }

  const filterContactsBySearchConditions = (): Entry[] => {
    const filterQuery = contacts.filter(({ firstName, lastName, address }) =>
      queryCondition.every((query: string) =>
        new RegExp(query, 'i').test(firstName + lastName + address.prefectures)
      )
    )

    if (!ageRangeCondition.min && !ageRangeCondition.max) {
      return filterQuery
    }

    const haveBirthdayContacts = _.filter(filterQuery, 'birthday')
    const filterAgeRange = haveBirthdayContacts.filter(({ birthday }) => {
      const age = calcAge(birthday)
      const result = ageRangeCondition.max
        ? _.inRange(age, ageRangeCondition.min, ageRangeCondition.max)
        : age >= ageRangeCondition.min
      return result
    })
    return filterAgeRange
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setInitializing(false)
        router.push('/signup')
        return
      }
      const colRef = db.collection(`users/${user.uid}/contacts`)
      const unsub = colRef.onSnapshot((s) => {
        const contacts = _.map(s.docs, (doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setUser({ ...user.user, user: { uid: user.uid, contacts } })
      })
      setInitializing(false)
      return () => unsub()
    })
  }, [])

  return {
    initializing,
    user,
    setUser,
    filterContactsBySearchConditions,
  }
}
