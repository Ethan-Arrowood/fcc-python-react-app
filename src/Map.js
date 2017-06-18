import React from 'react';
import ChallengeJSON from './challenges.json';
import './styles/Map.css';

function renderLesson({title, id}) {
  return (
    <li key={id} className="lesson-list-element">
      <a
        href="/"
        className="lesson-link"
        onClick={() => console.log(id)}
      >{title}</a>
    </li>
  )
}
function renderChapter(title, lessons) {
  return (
    <div key={title} className="chapter">
      <span className="chapter-title">{title}</span>
      <ul className="lesson-list">
        {lessons.map(lesson => renderLesson(lesson))}
      </ul>
    </div>
  )
}
function renderChallengeList({chapters, challenges}) {
  return challenges.map((lessons, i) => {
    const title = chapters[i];
    return renderChapter(title, lessons);
  });
}

const Map = ({ challenges, history, toggleMap, width }) => {
  return (
    <div className="map" style={{ width: width }}>
      <div className="challenge-list">
        {renderChallengeList(ChallengeJSON)}
      </div>
      <a href="javascript:void(0)" className="close-map" onClick={() => toggleMap()}>&times;</a>
    </div>
  );
}

export default Map;
