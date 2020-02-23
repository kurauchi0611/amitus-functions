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
        createdAt: FieldValue.serverTimestamp(),
        email: userRecord.email,
        displayName: userRecord.displayName,
        follow: 0,
        follower: 0,
        introduction: "",
        language: [],
        photoURL: null,
        rating: 1,
        updatedAt: null,
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