const { auth, db, FieldValue ,storage} = require('../util/firebase');

exports.setStoreUserImage = async object => {
  console.log(object);
  const name = object.name.split('/');
  const link =`https://firebasestorage.googleapis.com/v0/b/amitus-99097.appspot.com/o/userImages%2F${name[1]}?alt=media&token=${object.metadata.firebaseStorageDownloadTokens}`;
  console.log(link);
  const uid=name[1].split('.png');
  db.collection('users').doc(uid[0]).set({photoURL:link},{merge:true});
  auth.updateUser(uid[0],{photoURL:link});
}