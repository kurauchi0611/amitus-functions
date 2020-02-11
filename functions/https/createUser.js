const { auth, db, FieldValue } = require('../util/firebase');

exports.createUser = async user => {
  let res = false;
  await auth.createUser({
    email: user.email,
    emailVerified: false,
    password: user.password,
    displayName: user.name,
    disabled: false
  })
    .then(async userRecord => {
      console.log(userRecord);
      await db.collection('users').doc(userRecord.uid).set({
        name: userRecord.displayName,
        email: userRecord.email,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: null,
        language: {},
        introduction: "",
        photoURL: null
      }).then(() => {
        console.log("createuserSuccess");
        res = true;
      })
    })
    .catch(error => {
      console.log('Error creating new user:', error);
    });
  return res;
}