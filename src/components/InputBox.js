import React from 'react';

function InputBox(props) {
  return (
    <div>
      <label htmlFor="input-box">Enter a word:</label>
      <input
        type="text"
        id="input-box"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputBox;
