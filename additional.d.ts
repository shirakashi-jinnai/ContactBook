type Address = {
  postalCode: string
  prefectures: string
  municipalities: string
  houseNumber: string
}

interface EntryField {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
}
