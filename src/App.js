import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {withRouter} from 'react-router';

import './styles/App.css';

import Navbar from './Navbar';
import ChallengeView from './ChallengeView';
import CurriculumComplete from './CurriculumComplete';
import GetStarted from './GetStarted';

import ChallengesJSON from './challenges.json';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);

    // get the JSON file challenges list
    const { challenges, last_edit, chapters } = ChallengesJSON;

    // if the localStorage does not exists or the challenges list is not authentic
    // set the localStorage with the challenges list from the JSON File.
    if ( !localStorage.getItem('fcc-python-challenges') || !this.isChallengesAuthentic(last_edit) ) {
      localStorage.setItem('fcc-python-challenges-last-edit', last_edit);
      localStorage.setItem('fcc-python-challenges-chapters', JSON.stringify(chapters))
      this.setChallengeList(this.flatten(challenges));
    }

    // set the challenges list state
    this.state = {
      challenges: this.getChallengeList(),
      mapWidth: "0"
    }
  }

  // helper function to condense the multidimensional challenges list
  flatten = list => list.reduce((a, b) => a.concat(b), []);

  // setter and getter for localStorage challenge object
  setChallengeList = challenges => localStorage.setItem('fcc-python-challenges', JSON.stringify(challenges));
  getChallengeList = () => JSON.parse(localStorage.getItem('fcc-python-challenges'));

  // check if last_edit dates differ
  isChallengesAuthentic = (last_edit) => {
    const date = localStorage.getItem('fcc-python-challenges-last-edit');
    return parseInt(date, 10) === last_edit;
  }

  handleUpdateChallenges = (newChallengesList) => {
    this.setChallengeList(newChallengesList);
    this.setState({
      challenges: newChallengesList
    });
  }

  handleAdvanceToNextChallenge = (currentChallengeIndex) => {
    const { challenges } = this.state;
    const nextChallengeIndex = currentChallengeIndex + 1;
    if ( nextChallengeIndex === challenges.length ) {
      this.props.history.push('/curriculum-complete');
    } else {
      const nextChallenge = challenges[nextChallengeIndex];
      const nextPath = nextChallenge.title.toLowerCase().replace(" ", "-");

      this.props.history.push(nextPath, { completedChallenge: currentChallengeIndex });
    }
  }
  handleAdvanceToPrevChallenge = (currentChallengeIndex) => {
    const { challenges } = this.state;
    const prevChallengeIndex = currentChallengeIndex - 1;
    const prevChallenge = challenges[prevChallengeIndex];
    const prevPath = prevChallenge.title.toLowerCase().replace(" ", "-");

    this.props.history.push(prevPath);
  }

  componentWillReceiveProps(nextProps) {
    const nextChallengeTitle = nextProps.match.params.challengeTitle;
    let nextChallenges = this.state.challenges;
    const nextChallengeIndex = this.getIndex(nextChallenges, nextChallengeTitle);

    // complete the current challenge if nextProps was clicked
    if ( nextProps.location.state ) {
      const completedChallengeIndex = nextProps.location.state.completedChallenge;
      if ( completedChallengeIndex ) {
        nextChallenges[completedChallengeIndex].completed = true;
      }
      this.handleUpdateChallenges(nextChallenges);
    }

  }

  getIndex = ( challenges, challengeTitle ) => (
    challenges.findIndex(c => (
      c.title.toLowerCase().replace(" ", "-") === challengeTitle
    ))
  )

  toggleMap = () => {
    const { mapWidth } = this.state;
    this.setState({
      mapWidth: mapWidth === "250px" ? "0" : "250px"
    });
  }

  render() {
    return (
      <div>
        <Navbar />

        <Switch>

          <Route path="/curriculum-complete" component={CurriculumComplete} />

          <Route path={`${this.props.match.url}:challengeTitle`} render={props => (
            <ChallengeView {...props}
              challenges={this.state.challenges}
              handleAdvanceToPrevChallenge={this.handleAdvanceToPrevChallenge}
              handleAdvanceToNextChallenge={this.handleAdvanceToNextChallenge}
              toggleMap={this.toggleMap}/>
          )} />

          <Route path={`${this.props.match.url}/`} component={GetStarted} />

        </Switch>


        <Map
          challengesList={this.state.challenges} 
          width={this.state.mapWidth}
          toggleMap={this.toggleMap}
        />
      </div>
    );
  }
}

export default withRouter(App);
