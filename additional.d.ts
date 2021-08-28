type Address = {
  postalCode: string
  prefectures: string
  municipalities: string
  houseNumber: string
}

type Entry = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
  id: string
  liked: boolean
}

type User = {
  uid: string
  contacts: Entry[]
  keywordsCondition: string[]
  ageRangeCondition: { [key: string]: number | null }
}
