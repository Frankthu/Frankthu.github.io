const idiomForm = document.getElementById('idiom-form');
const idiomInput = document.getElementById('idiom-input');
const idiomResult = document.getElementById('idiom-result');

idiomForm.addEventListener('submit', event => {
  event.preventDefault();
  const word = idiomInput.value.trim();
  if (word) {
    idiomResult.innerHTML = '<p>正在查询成语信息，请稍候...</p>';
    fetch(`/api/idiom?word=${encodeURIComponent(word)}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          idiomResult.innerHTML = `<p>${data.error}</p>`;
        } else {
          fetch(`/api/translate?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data2 => {
              const translation = data2.translation || '无法翻译';
              const resultHtml = `
                <h2>${data.word}（${data.derivation}）</h2>
                <p>${data.explanation}</p>
                <p>例：${data.example}</p>
                <p>英译：${translation}</p>
              `;
              idiomResult.innerHTML = resultHtml;
            })
            .catch(error => {
              console.error(error);
              idiomResult.innerHTML = '<p>获取数据时发生错误</p>';
            });
        }
      })
      .catch(error => {
        console.error(error);
        idiomResult.innerHTML = '<p>获取数据时发生错误</p>';
      });
  }
});