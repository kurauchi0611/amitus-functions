const { db, talkStorage } = require('../util/firebase');
const spawn = require('child-process-promise').spawn;
const path = require("path");
const os = require("os");
const fs = require('fs');
exports.createThumb = async (data, params) => {
  const nameSplit = data.message[0].split("?alt=media&token");
  const type = nameSplit[0].split(".");
  const uploadName = `${params.talksId}-${params.talkId}.${
    type[type.length - 1]
    }`;
  const tempFilePath = path.join(os.tmpdir(), uploadName);
  const filePath = nameSplit[0].split("https://firebasestorage.googleapis.com/v0/b/amitus-99097/o/talkImages%2F")
  await talkStorage.file(`talkImages/${filePath[1]}`).download({ destination: tempFilePath });
  await spawn('convert', [tempFilePath, '-thumbnail', '250x250>', tempFilePath])
  const thumbFileName = `thumb_${uploadName}`;
  await talkStorage.upload(`/tmp/${uploadName}`, { destination: `talkImages/${thumbFileName}` });
  fs.unlinkSync(tempFilePath)
  //get download url
  const url = await talkStorage.file(`talkImages/${thumbFileName}`).getSignedUrl({
    action: 'read',
    expires: '12-31-3020' //1000年後に設定
  });
  return db.collection('talks').doc(params.talksId).collection('talk').doc(params.talkId).set({
    type: "image",
    message: [
      data.message[0],
      url[0]
    ],
  }, { merge: true })
}