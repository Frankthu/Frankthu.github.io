const idiomInput = document.getElementById('idiom-input');
const extractButton = document.getElementById('extract-button');
const idiomOutput = document.getElementById('idiom-output');

extractButton.addEventListener('click', () => {
  const idiom = encodeURIComponent(idiomInput.value.trim().toLowerCase());
  
  if (idiom === '') {
    idiomOutput.innerHTML = '请输入一个成语';
    return;
  }
  
  fetch('idiom.json')
    .then(response => response.json())
    .then(data => {
      const result = data.find(item => item.word.toLowerCase() === decodeURIComponent(idiom));
      
      if (result) {
        const html = `
          <p><strong>成语:</strong> ${result.word}</p>
          <p><strong>出处:</strong> ${result.derivation}</p>
          <p><strong>例子:</strong> ${result.example}</p>
          <p><strong>解释:</strong> ${result.explanation}</p>
        `;
        idiomOutput.innerHTML = html;
      } else {
        idiomOutput.innerHTML = '未找到该成语';
      }
    })
    .catch(error => {
      console.error(error);
      idiomOutput.innerHTML = '获取数据时发生错误';
    });
});