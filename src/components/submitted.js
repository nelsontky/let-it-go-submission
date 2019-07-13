import React from 'react';
import Preview from './preview';
import Modal from 'reactjs-popup';

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

  render() {
    console.log(this.submission);
    return (
      <div>
        <h6>{this.submission.name}</h6>
        {this.submission.facilities.male && <i className="em-svg em-man-raising-hand" />}
        {this.submission.facilities.female && (
          <i className="em-svg em-woman-raising-hand" />
        )}
        {this.submission.facilities.handicapped && <i className="em-svg em-wheelchair" />}
        {" "}
        {this.submission.facilities.waterCooler && (
          <i className="em-svg em-potable_water" />
        )}
        {" "}
        {this.submission.facilities.showerHeads && <i className="em-svg em-shower" />}
        {this.submission.facilities.hose && <i className="em-svg em-sweat_drops" />}
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
        {this.state.submissions.map(x =>
          <Submission>{x}</Submission>
        )}
      </div>
    );
  }
}
export default Submitted;
