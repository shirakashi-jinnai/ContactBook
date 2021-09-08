import _ from 'lodash'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [contacts, setContacts] = useState({})

  const [filterCondition, setFilterCondition] = useReducer(
    (state: FilterCondition, data: Partial<FilterCondition>) =>
      _.assign({}, state, data),
    { queries: [], ageRangeCondition: { min: null, max: null } }
  )

  const { ageRangeCondition, queries } = filterCondition
  const { min, max } = ageRangeCondition

  //検索中かどうか
  const isSearching = !_.isEmpty(queries) || min || max

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.fromJSDate(birthday.toDate())
    return _.floor(DateTime.now().diff(dt).as('years'))
  }

  const filterContactsBySearchConditions = (contacts: Contact[]): Contact[] => {
    let filterQuery: Contacts = {}
    let resultQuery: Contact[] = []

    Object.values(contacts).map((c) => {
      const searchTargets = [c.lastName, c.firstName, c.address.prefecture]
      for (const target of searchTargets) {
        for (const query of queries) {
          if (new RegExp(query, 'i').test(target)) {
            filterQuery = { ...filterQuery, c }
          }
        }
      }
    })
    resultQuery = Object.values(filterQuery)
    if (!min && !max) {
      return resultQuery
    }

    if (_.isEmpty(queries)) {
      resultQuery = contacts
    }

    const filterAgeRange = resultQuery
      .filter(({ birthday }) => !_.isEmpty(birthday))
      .filter(({ birthday }) => {
        const age = calcAge(birthday)
        return max ? _.inRange(age, min, max) : age >= min
      })
    return filterAgeRange
  }

  const filteredContacts = (contacts: Contact[]): Contact[] => {
    if (!isSearching) return contacts
    return filterContactsBySearchConditions(contacts)
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
        const obj = contacts.reduce((obj, data) => {
          obj[data.id] = data
          return obj
        }, {})
        setContacts(obj)
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
