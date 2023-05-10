import React from 'react';

function IdiomDisplay(props) {
  return (
    <div>
      <h2>{props.idiom.word}</h2>
      <p><strong>Derivation:</strong> {props.idiom.derivation}</p>
      <p><strong>Example:</strong> {props.idiom.example}</p>
      <p><strong>Explanation:</strong> {props.idiom.explanation}</p>
      <p><strong>Abbreviation:</strong> {props.idiom.abbreviation}</p>
    </div>
  );
}

export default IdiomDisplay;
