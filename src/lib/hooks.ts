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

  const findAge = (birthday: string): number => {
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

  const filterContacts = (items: Entry[], keywords: string[], ageRange) => {
    const searchKeywords = items.filter(
      ({ firstName, lastName, address }) =>
        keywords &&
        keywords.every(
          (kw: string) =>
            (firstName + lastName + address.prefectures)
              .toLowerCase()
              .indexOf(kw) !== -1
        )
    )
    if (!ageRange.min && !ageRange.max) {
      return searchKeywords
    }

    const haveBirthdayContacts = _.filter(searchKeywords, 'birthday')
    const searchAgeRange = haveBirthdayContacts.filter(({ birthday }) => {
      const age = findAge(birthday)
      const result = ageRange.max
        ? _.inRange(age, ageRange.min, ageRange.max)
        : age >= 80
      return result
    })
    return searchAgeRange
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
    filterContacts
  }
}
