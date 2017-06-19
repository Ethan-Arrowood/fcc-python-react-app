import React from 'react';

const CurriculumComplete = ({history}) => {
  return (
    <div>
      Curriculum Complete

      <button onClick={() => {
        localStorage.clear('fcc-python-challenges-last-edit');
        history.push('/');
      }}>Reset Curriculum</button>
    </div>
  )
}

export default CurriculumComplete;
