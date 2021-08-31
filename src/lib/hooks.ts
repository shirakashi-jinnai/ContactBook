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
  const [contacts, setContacts] = useReducer(
    (state: Contact[], data: Contact[]) => _.concat(state, data),
    initialState.contacts
  )
  const [filterCondition, setFilterCondition] = useReducer(
    (state: object, data: object) => _.assign({}, state, data),
    initialState.filterCondition
  )

  const { ageRangeCondition, queries } = <FilterCondition>filterCondition
  const { min, max } = ageRangeCondition

  //検索中かどうか
  const isSearching = !_.isEmpty(queries) || min || max

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.fromJSDate(birthday.toDate())
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

    if (!min && !max) {
      return filterQuery
    }

    const filterAgeRange = _.filter(filterQuery, 'birthday').filter(
      ({ birthday }) => {
        const age = calcAge(birthday)
        const result = max ? _.inRange(age, min, max) : age >= min
        return result
      }
    )
    return filterAgeRange
  }

  const filteredContacts = (contacts: Contact[]) => {
    if (!isSearching) return contacts
    return filterContactsBySearchConditions()
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
        setContacts(contacts)
      })
      setInitializing(false)
      return () => unsub()
    })
  }, [])

  return {
    initializing,
    contacts,
    setContacts,
    setFilterCondition,
    filterContactsBySearchConditions,
    filteredContacts,
    isSearching,
  }
}
