/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import { auth, db } from './firebase'
import { TimestampConverter } from './TimestampConverter'

export const useUserState = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [contacts, setContacts] = useState({})

  const [filterCondition, setFilterCondition] = useReducer(
    (state: FilterCondition, data: Partial<FilterCondition>) =>
      _.assign({}, state, data),
    { queries: [], ageRangeCondition: {} }
  )

  const { ageRangeCondition, queries } = filterCondition
  const { min, max } = ageRangeCondition

  //検索中かどうか
  const isSearching = !_.isEmpty(queries) || !isNaN(min) || !isNaN(max)

  const calcAge = (birthday: Date): number => {
    const dt = DateTime.fromJSDate(birthday)
    return _.floor(DateTime.now().diff(dt).as('years'))
  }

  //カタカナを平仮名へ変換
  const convertToHiragana = (str: string) => {
    return str.replace(/[\u30A1-\u30FA]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    )
  }

  const filterContactsBySearchConditions = (contacts: Contacts): string[] => {
    const queryResult = _.keys(contacts).filter((key) => {
      const searchTargets = [
        contacts[key].lastName,
        contacts[key].firstName,
        contacts[key].address.prefecture,
      ]
      for (const target of searchTargets) {
        for (const query of queries) {
          if (new RegExp(query, 'i').test(target)) return true
        }
      }
      return false
    })

    if (!min && !max) {
      return queryResult
    }

    const filteredResult = _.isEmpty(queries) ? _.keys(contacts) : queryResult
    const filterAgeRange = filteredResult.filter((key) => {
      const age = calcAge(contacts[key].birthday)
      return isNaN(max) ? age >= min : _.inRange(age, min, max)
    })
    return filterAgeRange
  }

  const filteredContacts = (contacts: Contacts): Contacts => {
    if (!isSearching) return contacts
    return _.transform(
      filterContactsBySearchConditions(contacts),
      (res, key) => (res[key] = contacts[key]),
      {}
    )
  }
  filteredContacts(contacts)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setInitializing(false)
        router.push('/signup')
        return
      }
      const colRef = db.collection(`users/${user.uid}/contacts`)
      const unsub = colRef
        .withConverter(new TimestampConverter())
        .onSnapshot((s) => {
          const res: Contacts = _.transform(
            s.docs,
            (acc, doc) => (acc[doc.id] = doc.data()),
            {}
          )

          const alphabeticalRes = _(res)
            .toPairs()
            .sort((a, b) =>
              convertToHiragana(a[1].lastName).localeCompare(
                convertToHiragana(b[1].lastName),
                'ja'
              )
            )
            .fromPairs()
            .value()
          setContacts(alphabeticalRes)
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
