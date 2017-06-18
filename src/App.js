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

    const { challenges } = ChallengesJSON;

    if ( !localStorage.getItem('fcc-python-challenges') || !this.isChallengesAuthentic(challenges) ) {
      this.setChallengeList(this.flatten(challenges));
    }

    this.state = {
      challenges: this.getChallengeList(),
      mapWidth: "0"
    }
  }

  flatten = list => list.reduce((a, b) => a.concat(b), []);

  // setter and getter for localStorage challenge object
  setChallengeList = challenges => localStorage.setItem('fcc-python-challenges', JSON.stringify(challenges));

  getChallengeList = () => JSON.parse(localStorage.getItem('fcc-python-challenges'));

  isChallengesAuthentic = ({last_edit}) => {
    const date = this.getChallengeList().lastEdit;
    return date === last_edit;
  }

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
              setChallengeList={this.setChallengeList}
              toggleMap={this.toggleMap}/>
          )} />

          <Route path="/" component={GetStarted} />

        </Switch>


        <Map challenges={this.state.challenges} width={this.state.mapWidth} toggleMap={this.toggleMap}/>
      </div>
    );
  }
}

export default withRouter(App);
