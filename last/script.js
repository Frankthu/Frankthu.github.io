const extractBtn = document.querySelector('#extract-btn');
const translateBtn = document.querySelector('#translate-btn');

extractBtn.addEventListener('click', () => {
  fetch('idiom.json')
    .then(response => response.json())
    .then(data => {
      const wordInfo = data[Math.floor(Math.random() * data.length)];
      document.querySelector('#word').textContent = `成语：${wordInfo.word}`;
      document.querySelector('#derivation').textContent = `典故：${wordInfo.derivation}`;
      document.querySelector('#example').textContent = `例句：${wordInfo.example}`;
      document.querySelector('#explanation').textContent = `解释：${wordInfo.explanation}`;
      document.querySelector('#translation').textContent = ''; // 清空翻译结果
      translateBtn.disabled = false; // 启用翻译按钮
    });
});

translateBtn.addEventListener('click', () => {
  const word = document.querySelector('#word').textContent.slice(3); // 获取成语
  const appid = '20200211000382774'; // 你的 APP ID
  const key = 'b1imCNk_EdXIHM0zX2bD'; // 你的密钥
  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${word}&from=zh&to=en&appid=${appid}&salt=1&sign=${appid}${word}1${key}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const translation = data.trans_result[0].dst;
      document.querySelector('#translation').textContent = `翻译：${translation}`;
    })
    .catch(error => {
      console.error(error);
      document.querySelector('#translation').textContent = '翻译出错，请稍后再试';
    });
});