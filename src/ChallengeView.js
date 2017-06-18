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
      curriculumComplete: false,
      challenges,
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
    console.log(nextProps);
    const nextChallengeTitle = nextProps.match.params.challengeTitle;
    let nextChallenges = nextProps.challenges;
    const nextChallengeIndex = this.getIndex(nextChallenges, nextChallengeTitle);

    // complete the current challenge if nextProps was clicked
    if ( nextChallengeIndex > this.state.challengeIndex ) {
      nextChallenges[nextChallengeIndex - 1].completed = true;
    }

    // update localStorage
    this.props.setChallengeList(nextChallenges);

    this.setState({
      challenges: nextChallenges,
      challengeIndex: nextChallengeIndex,
      currentChallenge: nextChallenges[nextChallengeIndex]
    });

  }

  handlePrevClick = () => {
    const { challenges, challengeIndex, curriculumComplete } = this.state;
    const { history } = this.props;

    if ( curriculumComplete ) {
      this.setState({
        curriculumComplete: false
      });
    }
    const prevChallenge = challenges[challengeIndex - 1];
    const prevPath = prevChallenge.title.toLowerCase().replace(" ", "-");
    history.push(prevPath);

  }

  handleNextClick = () => {
    const { challenges, challengeIndex } = this.state;
    const { history } = this.props;

    if ( challengeIndex + 1 === challenges.length ) {
      history.push('/curriculum-complete');
    } else {
      const nextChallenge = challenges[challengeIndex + 1];
      const nextPath = nextChallenge.title.toLowerCase().replace(" ", "-");
      history.push(nextPath);
    }

  }

  render() {
    const { match } = this.props;
    const { challengeIndex, curriculumComplete } = this.state;

    if ( challengeIndex === 0 ) {
      // disable prev button
      console.log('disable prev button');
    }
    return challengeIndex === -1 ? (
      <ChallengeNotFound />
    ) : (
      <div className="container">
        <div className="top">
          <div>{this.state.currentChallenge.title}</div>
          <iframe
            id="repl" frameBorder="0" width="100%" height="auto"
            src={this.state.currentChallenge.repl}></iframe>

        </div>

        <div className="bottom">

          <button
            id="prev-button"
            onClick={
              challengeIndex === 0 ?  null : this.handlePrevClick
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
            onClick={this.handleNextClick}
          >
            Next Challenge
            <i className="fa fa-arrow-right"></i>
          </button>

          <button id="map-button" className="btn" onClick={() => this.props.toggleMap()}>
            Map
            <i className="fa fa-list"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default ChallengeView;
