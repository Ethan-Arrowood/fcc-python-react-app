import React from 'react';

const Challenge = ({url}) => {
  return (
    <iframe
      id="repl"
      frameBorder="0"
      width="100%"
      height="auto"
      src={`${url}`}></iframe>
  )
}

export default Challenge;
