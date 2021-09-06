type Address = {
  postalCode: string
  prefecture: string
  municipalities: string
  houseNumber: string
}

type Contact = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: string | firebase.firestore.Timestamp
  address: Address
  id: string
  liked: boolean
}

type FilterCondition = {
  queries: string[]
  ageRangeCondition: { [key: string]: number | null }
}

type Contacts = { [key: string]: Contact }

type UserProps = {
  contacts: Contacts
  filterCondition: FilterCondition
}
