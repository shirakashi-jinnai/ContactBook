import _ from 'lodash'
import { db, auth } from './firebase'

export const sendEmail = async (email: string) => {
  if (!email) {
    alert('メールアドレスを入力してください')
    return
  }
  const callbackUrl = `${location.origin}/authentication`
  console.log(callbackUrl)

  const actionCodeSettings = {
    url: callbackUrl,
    handleCodeInApp: true,
  }

  window.localStorage.setItem('emailForSignIn', email), 'setitem'
  try {
    await auth.sendSignInLinkToEmail(email, actionCodeSettings)
    alert('メールを送信しました')
  } catch (error) {
    console.log(error.code)
    console.log(error.message)
    alert(error.message)
  }
}

//birthday から年齢を求める
const findAge = (birthday: string): number => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const splitBirthday = birthday.split('-')
  const birthdayYear = Number(splitBirthday[0])
  const birthdayMonth = Number(splitBirthday[1])
  const birthdayDate = Number(splitBirthday[2])

  let age = year - birthdayYear
  if (
    birthdayMonth > month ||
    (birthdayMonth == month && birthdayDate > date)
  ) {
    age -= 1
  }
  return age
}

export const searchItems = (items: Entry[], keywords: string[], ageRange) => {
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
