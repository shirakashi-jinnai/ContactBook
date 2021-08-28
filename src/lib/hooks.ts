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
    initialState.user
  )

  const { keywordsCondition, ageRangeCondition, contacts } = <User>user

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.now()
    const getBirthday = DateTime.fromFormat(birthday, 'yyyy-mm-dd')
    let age = dt.year - getBirthday.year
    if (
      getBirthday.month > dt.month ||
      (getBirthday.month == dt.month && getBirthday.day > dt.day)
    ) {
      age -= 1
    }
    return age
  }

  const filterContactsBySearchConditions = (): Entry[] => {
    const filterKeywords = contacts.filter(
      ({ firstName, lastName, address }) =>
        keywordsCondition &&
        keywordsCondition.every(
          (kw: string) =>
            (firstName + lastName + address.prefectures)
              .toLowerCase()
              .indexOf(kw) !== -1
        )
    )
    if (!ageRangeCondition.min && !ageRangeCondition.max) {
      return filterKeywords
    }

    const haveBirthdayContacts = _.filter(filterKeywords, 'birthday')
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
        setUser({ uid: user.uid, contacts })
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
