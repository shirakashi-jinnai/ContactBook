const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { DateTime } = require('luxon')
admin.initializeApp()
const db = admin.firestore()

const deleteContacts = async (uid) => {
  const contacts = await db
    .collection(`users/${uid}/contacts`)
    .where('removeTime', '<=', DateTime.now().minus({ days: 30 }).toJSDate())
    .where('trashed', '==', true)
    .get()
    .then((s) => _.map(s.docs, (doc) => doc.id))

  _.forEach(contacts, (contactId) => {
    db.doc(`users/${uid}/contacts/${contactId}`).delete()
  })
}

const deleteExpiredContacts = async () => {
  const users = await db
    .collection('users')
    .get()
    .then((s) => _.map(s.docs, (doc) => doc.id))

  const tasks = []
  _.forEach(users, (uid) => tasks.push(deleteContacts(uid)))

  await Promise.all(tasks)
}

exports.scheduledFunction = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await deleteExpiredContacts()
  })
