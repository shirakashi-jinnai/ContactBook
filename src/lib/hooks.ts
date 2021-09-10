import _ from 'lodash'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useReducer, useState } from 'react'
import { auth, db } from './firebase'
import { TimestampConberter } from './TimestampConverter'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [contacts, setContacts] = useState({})

  const [filterCondition, setFilterCondition] = useReducer(
    (state: FilterCondition, data: Partial<FilterCondition>) =>
      _.assign({}, state, data),
    { queries: [], ageRangeCondition: { min: null, max: null } }
  )
  console.log(filterCondition)

  const { ageRangeCondition, queries } = filterCondition
  const { min, max } = ageRangeCondition

  //検索中かどうか
  const isSearching = !_.isEmpty(queries) || min || max

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.fromJSDate(birthday)
    return _.floor(DateTime.now().diff(dt).as('years'))
  }

  const filterContactsBySearchConditions = (contacts: Contact[]): Contact[] => {
    const queryResult: Contact[] = []

    contacts.forEach((c) => {
      const searchTargets = [c.lastName, c.firstName, c.address.prefecture]
      for (const target of searchTargets) {
        for (const query of queries) {
          if (new RegExp(query, 'i').test(target)) {
            queryResult.push(c)
          }
        }
      }
    })

    if (!min && !max) {
      //重複した要素を削除して返す
      return _.uniq(queryResult)
    }

    const filteredResult = _.isEmpty(queries) ? contacts : _.uniq(queryResult)
    console.log(filteredResult)
    const filterAgeRange = filteredResult.filter(({ birthday }) => {
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
      const unsub = colRef
        .withConverter(new TimestampConberter())
        .onSnapshot((s) => {
          const arrayContacts = _.map(s.docs, (doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          const objContacts = _.transform(
            arrayContacts,
            (res, c) => {
              res[c.id] = c
            },
            {}
          )
          setContacts(objContacts)
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
