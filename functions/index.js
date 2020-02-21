const functions = require('firebase-functions');
const region = "asia-northeast1";

exports.createUser = functions.region(region).https.onCall((data, context) => {
  const { createUser } = require('./https/createUser');
  return createUser(data);
});

exports.setStoreUserImage = functions.region(region).storage.bucket('amitus-99097.appspot.com').object().onFinalize(object => {
  const { setStoreUserImage } = require('./storage/setStoreUserImage');
  return setStoreUserImage(object);
});

exports.ogpParser = functions.region(region).https.onCall((data, context) => {
  const { ogpParser } = require("./https/ogpParser");
  return ogpParser(data);
})

exports.postingTalk = functions.region(region).firestore.document('talks/{talksId}/talk/{talkId}').onCreate((snap, context) => {
  if (snap.data().type === "link") {
    const { ogpParser } = require("./store/ogpParser");
    return ogpParser(snap.data(), context.params);
  }
  if (snap.data().type === "image") {
    const { createThumb } = require("./store/createThumb");
    return createThumb(snap.data(), context.params);
  }
  else return true;
});

// トークがポストされる→ファンクション走る→typeがリンクならogpparser走らせる→ogpならドキュメント書き換え、無ければそのまま
// 画像投稿→documentクリエイト→img判定→リサイズ→リサイズ画像登録


