const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { DateTime } = require('luxon')
admin.initializeApp()
const db = admin.firestore()

const getContactsId = async (user) => {
  return await db
    .collection(`users/${user.id}/contacts`)
    .where('removeTime', '<=', DateTime.now().minus({ days: 30 }).toJSDate())
    .where('trashed', '==', true)
    .get()
    .then((s) => _.map(s.docs, ({ id }) => ({ id })))
}

const check24HoursDeletedElement = async () => {
  const users = await db
    .collection('users')
    .get()
    .then((s) => _.map(s.docs, ({ id }) => ({ id })))

  _.forEach(users, async (user) => {
    _.forEach(await getContactsId(user), async (c) => {
      await db.doc(`users/${user.id}/contacts/${c.id}`).delete()
    })
  })
}

exports.scheduledFunction = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await check24HoursDeletedElement()
  })
