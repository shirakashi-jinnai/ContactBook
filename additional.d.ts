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
  birthday: Date | null
  address: Address
  id: string
  liked: boolean
}

type FilterCondition = {
  queries: string[]
  ageRangeCondition: { [key: string]: number | null }
}

type State = {
  contacts: { [key: string]: Contact }
  filterCondition: FilterCondition
}
