const admin = require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://amitus-99097.firebaseio.com"
});
exports.db=admin.firestore();
exports.auth = admin.auth();
exports.storage=admin.storage();
exports.talkStorage=admin.storage().bucket("gs://amitus-99097");
exports.FieldValue=admin.firestore.FieldValue;

