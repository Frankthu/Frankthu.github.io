const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const idioms = require('./idiom.json');

const app = express();
app.use(cors());

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
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=${word}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data[0] && data[0][0]) {
        const translation = data[0][0][0];
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