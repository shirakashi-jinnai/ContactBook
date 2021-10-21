import _ from 'lodash'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'

export class TimestampConverter<T extends DocumentData>
  implements FirestoreDataConverter<DocumentData> {
  toFirestore(moduleObject: DocumentData): DocumentData {
    return moduleObject
  }

  fromFirestore(snapshot: QueryDocumentSnapshot): T {
    const data = snapshot.data()
    const converted = _.keys(data).reduce<DocumentData>((accumulator, key) => {
      if (data[key] instanceof Timestamp) {
        accumulator[key] = data[key].toDate()
      } else {
        accumulator[key] = data[key]
      }

      return accumulator
    }, {})
    return converted as T
  }
}
