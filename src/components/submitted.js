import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
// import Preview from './preview';

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.submission = this.props.children.submission;
  }

  render() {
    return (
      <div>
        <h4>
          {this.submission.name}
          <IconButton
            aria-label="Edit"
            onClick={() =>
              this.props.handleEdit(this.submission, this.props.children.id)
            }>
            <EditIcon>edit</EditIcon>
          </IconButton>
        </h4>
        {this.submission.facilities.male && (
          <i className="em-svg em-man-raising-hand" />
        )}
        {this.submission.facilities.female && (
          <i className="em-svg em-woman-raising-hand" />
        )}
        {this.submission.facilities.handicapped && (
          <i className="em-svg em-wheelchair" />
        )}{' '}
        {this.submission.facilities.waterCooler && (
          <i className="em-svg em-potable_water" />
        )}{' '}
        {this.submission.facilities.showerHeads && (
          <i className="em-svg em-shower" />
        )}{' '}
        {this.submission.facilities.hose && (
          <i className="em-svg em-sweat_drops" />
        )}
      </div>
    );
  }
}

class Submitted extends React.Component {
  constructor(props) {
    super(props);

    this.state = {submissions: []};

    // Read all of current user's submissions from firestore, then adds all
    // submissions into state.
    let submissions = [];
    this.props.db
      .collection('userSubmissions')
      .doc(this.props.uid)
      .collection('submissions')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => {
          submissions.push({submission: doc.data(), id: doc.id});
        }),
      )
      .then(() => this.setState({submissions}));
  }
  render() {
    return (
      <div>
        {this.state.submissions.map((x, i) => (
          <Submission key={i} handleEdit={this.props.handleEdit}>
            {x}
          </Submission>
        ))}
      </div>
    );
  }
}
export default Submitted;
