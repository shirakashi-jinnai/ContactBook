type Address = {
  postalCode: string
  prefecture: string
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

type UserState = {
  uid: string
  contacts: Entry[]
}

type FilterCondition = {
  queryCondition: string[]
  ageRangeCondition: { [key: string]: number | null }
}

type InitialState = {
  userState: UserState
  filterCondition: FilterCondition
}
