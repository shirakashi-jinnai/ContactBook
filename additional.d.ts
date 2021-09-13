type Address = {
  postalCode: string
  prefecture: string
  municipalities: string
  houseNumber: string
}

type Contact = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  birthday: Date | null
  address: Partial<Address>
  liked?: boolean
}

type FilterCondition = {
  queries: string[]
  ageRangeCondition: { [key: string]: number | null }
}

type Contacts = { [key: string]: Contact }
