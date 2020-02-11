const functions = require('firebase-functions');
const region = "asia-northeast1";

exports.createUser = functions.region(region).https.onCall((data, context) => {
  const { createUser } = require('./https/createUser');
  return createUser(data);
});