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
const ageCounter = (birthday: string): number => {
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

export const searchItems = (
  items,
  keywords: string[],
  ranges: string[],
  isLessThan: boolean
) => {
  const searchKeywords = items.filter(
    ({ firstName, lastName }) =>
      keywords &&
      keywords.every(
        (kw: string) => (firstName + lastName).toLowerCase().indexOf(kw) !== -1
      )
  )
  if (!ranges.length) {
    return searchKeywords
  }

  const haveBirthdayUsers = _.filter(searchKeywords, 'birthday')
  const searchAgeRange = haveBirthdayUsers.filter(({ birthday }) => {
    const age = ageCounter(birthday)
    if (ranges.length !== 1) {
      return age >= Number(ranges[0]) && age <= Number(ranges[1])
    } else {
      return isLessThan ? age < 10 : age >= 80
    }
  })
  return searchAgeRange
}
