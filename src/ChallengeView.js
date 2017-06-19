import React, { Component } from 'react';
import './styles/ChallengeView.css';

import ChallengeNotFound from './ChallengeNotFound';

class ChallengeView extends Component {
  constructor(props) {
    super(props);
    // this component will always be rendered with a challenge path

    // get challengeTitle from url String
    const challengeTitle = props.match.params.challengeTitle;
    // get challenges Array[]
    const { challenges } = props;
    // declare challengeIndex Number
    const challengeIndex = this.getIndex(challenges, challengeTitle);

    this.state = {
      challengeIndex,
      currentChallenge: challengeIndex === -1 ? null : challenges[challengeIndex]
    }
  }

  getIndex = ( challenges, challengeTitle ) => (
    challenges.findIndex(c => (
      c.title.toLowerCase().replace(" ", "-") === challengeTitle
    ))
  )

  componentWillReceiveProps(nextProps) {
    const nextChallengeTitle = nextProps.match.params.challengeTitle;
    const { challenges } = nextProps;
    const nextChallengeIndex = this.getIndex(challenges, nextChallengeTitle);
    const nextChallenge = challenges[nextChallengeIndex];

    this.setState({
      challengeIndex: nextChallengeIndex,
      currentChallenge: nextChallenge
    });
  }
  render() {
    const {
      toggleMap,
      handleAdvanceToPrevChallenge,
      handleAdvanceToNextChallenge } = this.props;
    const { challengeIndex, currentChallenge } = this.state;

    return challengeIndex === -1 ? (
      <ChallengeNotFound />
    ) : (
      <div className="container">
        <div className="top">
          <div className="challenge-title">Challenge: {currentChallenge.title}</div>
          <iframe
            id="repl" frameBorder="0" width="100%" height="100%"
            src={currentChallenge.repl}></iframe>

        </div>

        <div className="bottom">

          <button
            id="prev-button"
            onClick={
              challengeIndex === 0 ?  null : (
                () => handleAdvanceToPrevChallenge(challengeIndex)
              )
            }
            className={
              challengeIndex === 0 ? "btn disabled" : "btn"
            }
          >
            <i className="fa fa-arrow-left"></i>
            Previous Challenge
          </button>

          <button
            id="next-button"
            className="btn"
            onClick={() => handleAdvanceToNextChallenge(challengeIndex)}
          >
            Next Challenge
            <i className="fa fa-arrow-right"></i>
          </button>

          <button id="map-button" className="btn" onClick={() => toggleMap()}>
            Map
            <i className="fa fa-list"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default ChallengeView;
