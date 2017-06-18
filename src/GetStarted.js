import React from 'react';
import { Link } from 'react-router-dom';
import './styles/GetStarted.css';

const GetStarted = () => {
  return (
    <div className='get-started'>
      Welcome to FreeCodeCamp Python Curriculum.
      Your progress is stored directly in your browser (using localStorage).

      Happy Coding!

      <Link to="/print">Start</Link>
    </div>
  );
};

export default GetStarted;
