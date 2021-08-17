type Address = {
  postalCode: string
  prefectures: string
  municipalities: string
  houseNumber: string
}

export type EntryField = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
}

export type Entry = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
  id: string
}
