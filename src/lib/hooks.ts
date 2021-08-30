import firebase from 'firebase'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'
import { initialState } from './initialstate'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState
  )

  const { contacts, filterCondition } = <State>user
  const { queries, ageRangeCondition } = filterCondition

  //検索中かどうか
  const isSearching =
    !_.isEmpty(queries) || ageRangeCondition.min || ageRangeCondition.max

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.fromJSDate(new Date(birthday.toDate()))
    return Math.abs(Math.floor(dt.diffNow().as('years')))
  }

  const filterContactsBySearchConditions = (): Contact[] => {
    const filterQuery = contacts.filter((c) => {
      if (_.isEmpty(queries)) {
        return contacts
      }

      for (let query of queries) {
        return new RegExp(query, 'i').test(
          c.firstName + c.lastName + c.address.prefecture
        )
      }
    })

    if (!ageRangeCondition.min && !ageRangeCondition.max) {
      return filterQuery
    }

    const filterAgeRange = _.filter(filterQuery, 'birthday').filter(
      ({ birthday }) => {
        const age = calcAge(birthday)
        const result = ageRangeCondition.max
          ? _.inRange(age, ageRangeCondition.min, ageRangeCondition.max)
          : age >= ageRangeCondition.min
        return result
      }
    )

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
        setUser({ contacts })
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
    isSearching,
  }
}
