const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const md5 = require('md5');
const app = express();
app.use(cors());

const APP_ID = '20200211000382774';
const SECRET_KEY = 'b1imCNk_EdXIHM0zX2bD';

app.get('/api/idiom', (req, res) => {
  const word = req.query.word;
  const idiom = idioms[word];
  if (idiom) {
    const result = {
      word,
      derivation: idiom.derivation,
      example: idiom.example,
      explanation: idiom.explanation,
    };
    res.json(result);
  } else {
    res.json({ error: '无法解析成语信息' });
  }
});

app.get('/api/translate', (req, res) => {
  const word = req.query.word;
  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate`;
  const salt = Date.now();
  const sign = md5(APP_ID + word + salt + SECRET_KEY);
  const params = `?q=${encodeURIComponent(word)}&from=zh&to=en&appid=${APP_ID}&salt=${salt}&sign=${sign}`;
  fetch(url + params)
    .then(response => response.json())
    .then(data => {
      if (data && data.trans_result && data.trans_result.length > 0) {
        const translation = data.trans_result[0].dst;
        res.json({ translation });
      } else {
        res.json({ error: '无法翻译成语' });
      }
    })
    .catch(error => {
      console.error(error);
      res.json({ error: '获取数据时发生错误' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});