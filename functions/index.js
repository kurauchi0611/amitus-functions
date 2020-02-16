const functions = require('firebase-functions');
const region = "asia-northeast1";

exports.createUser = functions.region(region).https.onCall((data, context) => {
  const { createUser } = require('./https/createUser');
  return createUser(data);
});

exports.setStoreUserImage = functions.region(region).storage.bucket('amitus-99097.appspot.com').object().onFinalize(object => {
  const {setStoreUserImage} =require('./storage/setStoreUserImage');
  return setStoreUserImage(object);
});