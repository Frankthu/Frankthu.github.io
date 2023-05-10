import React, { useState } from 'react';
import InputBox from './components/InputBox';
import ExtractButton from './components/ExtractButton';
import IdiomDisplay from './components/IdiomDisplay';
import idioms from './data/idiom.json';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [randomIdiom, setRandomIdiom] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleExtractClick = () => {
    const filteredIdioms = idioms.filter((idiom) =>
      idiom.word.toLowerCase().includes(inputValue.toLowerCase())
    );
    const randomIndex = Math.floor(Math.random() * filteredIdioms.length);
    const selectedIdiom = filteredIdioms[randomIndex];
    setRandomIdiom(selectedIdiom);
  };

  return (
    <div className="App">
      <InputBox value={inputValue} onChange={handleInputChange} />
      <ExtractButton onClick={handleExtractClick} />
      {randomIdiom && <IdiomDisplay idiom={randomIdiom} />}
    </div>
  );
}

export default App;
