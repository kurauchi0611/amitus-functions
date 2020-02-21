const { db } = require('../util/firebase');
const parser = require('ogp-parser');

exports.ogpParser = async (data, params) => {
  const ogpData = await parser(data.message, true);
  if (!ogpData.ogp['og:title']) return true;
  else {
    return db.collection('talks').doc(params.talksId).collection('talk').doc(params.talkId).set({
      type: "ogp",
      message: [
        ogpData.ogp['og:title'][0],
        ogpData.ogp['og:image'][0],
        ogpData.ogp['og:description'][0],
        ogpData.ogp['og:url'][0]
      ],
    }, { merge: true })
  }
}