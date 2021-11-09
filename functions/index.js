const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { DateTime } = require('luxon')
admin.initializeApp()
const db = admin.firestore()

const getExpiredContactIds = async (user) => {
  return await db
    .collection(`users/${user.id}/contacts`)
    .where('removeTime', '<=', DateTime.now().minus({ days: 30 }).toJSDate())
    .where('trashed', '==', true)
    .get()
    .then((s) => _.map(s.docs, ({ id }) => ({ id })))
}

const delete24HoursExpiredElement = async () => {
  const users = await db
    .collection('users')
    .get()
    .then((s) => _.map(s.docs, ({ id }) => ({ id })))

  _.map(users, async (user) => {
    await Promise.all(
      _.map(await getExpiredContactIds(user), (c) =>
        db.doc(`users/${user.id}/contacts/${c.id}`).delete()
      )
    )
  })
}

exports.scheduledFunction = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await delete24HoursExpiredElement()
  })
