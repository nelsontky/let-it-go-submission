import React from 'react';
import Paranoma from './paranoma';

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.submission = this.props.children;
  }

  handicappedText() {
    if (!this.submission.handicapped) {
      return 'Is handicapped accessible';
    } else if (!this.submission.separateHandicapped)
      return 'Is handicapped accessible (Handicapped cubicle inside toilet)';
    else {
      return 'Is handicapped accessible (Has separate handicapped toilet)';
    }
  }

  glanceStyle(bool) {
    return {
      textDecoration: bool ? '' : 'line-through',
      color: bool ? '' : 'gray',
    };
  }

  render() {
    return (
      <div>
        <h6>{this.submission.name}</h6>
        <ul style={{listStyle: 'none'}}>
          <li style={this.glanceStyle(this.submission.facilities.male)}>
            <i className="em-svg em-man-raising-hand" />
            Has Male toilet
          </li>
          <li style={this.glanceStyle(this.submission.facilities.female)}>
            <i className="em-svg em-woman-raising-hand" />
            Has Female toilet
          </li>
          <li style={this.glanceStyle(this.submission.facilities.handicapped)}>
            <i className="em-svg em-wheelchair" />
            {this.handicappedText()}
          </li>
          <li style={this.glanceStyle(this.submission.facilities.waterCooler)}>
            <i className="em-svg em-potable_water" />
            Has water cooler
          </li>
          <li style={this.glanceStyle(this.submission.facilities.showerHeads)}>
            <i className="em-svg em-shower" />
            Has shower heads
          </li>
          <li style={this.glanceStyle(this.submission.facilities.hose)}>
            <i className="em-svg em-sweat_drops" />
            Has hose
          </li>
        </ul>

        <Paranoma paranomaUrl={this.submission.paranomaUrl} />
      </div>
    );
  }
}

class Submitted extends React.Component {
  constructor(props) {
    super(props);

    this.state = {submissions: []};

    // Read all of current user's submissions from firestore
    let submissions = [];
    this.props.db
      .collection('users')
      .doc(this.props.uid)
      .collection('submissions')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => submissions.push(doc.data())),
      )
      .then(() => this.setState({submissions}));
  }

  render() {
    return (
      <div>
        {this.state.submissions.length !== 0 && (
          <Submission>{this.state.submissions[0]}</Submission>
        )}
      </div>
    );
  }
}

export default Submitted;
