const parser = require('ogp-parser');

exports.ogpParser = async data => {
  let responce = 'unchi';
  await parser(data, true).then(data => {
    console.log(data);
    console.log(data.ogp['og:title']);
    if (!data.ogp['og:title']) {
      responce = [
        'no',
        data.title
      ]
    }
    else {
      responce = [
        'ogp',
        data.ogp['og:title'][0],
        data.ogp['og:image'][0],
        data.ogp['og:description'][0],
        data.ogp['og:url'][0]
      ]
    }
    console.log(responce)
  }).catch(function (error) {
    console.log('エラー');
    responce = error;
  });
  return responce;
}