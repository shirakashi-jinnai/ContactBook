type Address = {
  postalCode: string
  prefecture: string
  municipalities: string
  houseNumber: string
}

type Contact = {
  avatarImg: string
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
  ageRangeCondition: {
    min?: number
    max?: number
  }
}

type Contacts = { [key: string]: Contact }
