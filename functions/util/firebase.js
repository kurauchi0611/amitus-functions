const admin = require('firebase-admin');

admin.initializeApp();
exports.db=admin.firestore();
exports.auth = admin.auth();
exports.storage=admin.storage();
exports.FieldValue=admin.firestore.FieldValue;

