import React from 'react';
import { withRouter } from 'react-router';
import ChallengesJSON from './challenges.json';
import './styles/Map.css';

function renderLesson({title, id}, history, challengesList) {
  const url = title.toLowerCase().replace(" ", "-");
  const challenge = challengesList.find(c => c.title === title);
  const completed = challenge.completed;
  return (
    <li key={id} className="lesson-list-element">

      <button
        className="lesson-link"
        onClick={() => {
          history.push(`${url}`)
        }}
      >{ completed ? <i className="fa fa-check"></i> : null } {title}</button>
    </li>
  )
}
function renderChapter(title, lessons, history, challengesList) {
  return (
    <div key={title} className="chapter">
      <span className="chapter-title">{title}</span>
      <ul className="lesson-list">
        {lessons.map(lesson => renderLesson(lesson, history, challengesList))}
      </ul>
    </div>
  )
}
function renderChallengeList({challenges, chapters}, history, challengesList) {
  return challenges.map((lessons, i) => {
    const title = chapters[i];
    return renderChapter(title, lessons, history, challengesList);
  });
}

const Map = ({ challengesList, history, toggleMap, width }) => {
  return (
    <div className="map" style={{ width: width }}>
      <div className="challenge-list">
        {renderChallengeList(ChallengesJSON, history, challengesList)}
      </div>
      <a href="javascript:void(0)" className="close-map" onClick={() => toggleMap()}>&times;</a>
    </div>
  );
}

export default withRouter(Map);
