import React from 'react';
import Preview from './preview';
import SubmissionsSortingDropdown from './submissionsSortingDropdown';
import Status from './status';

// Material UI imports
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function compareByName(a, b) {
  return a.submission.name.localeCompare(b.submission.name);
}

function compareByDate(a, b) {
  return b.submission.date.toDate() - a.submission.date.toDate();
}

function compareByStatus(a, b) {
  let aValue;
  let bValue;

  switch (a.submission.status.approval) {
    case 'rejected':
      aValue = -1;
      break;
    case 'approved':
      aValue = 0;
      break;
    default:
      aValue = 1;
      break;
  }

  switch (b.submission.status.approval) {
    case 'rejected':
      bValue = -1;
      break;
    case 'approved':
      bValue = 0;
      break;
    default:
      bValue = 1;
      break;
  }

  return aValue - bValue;
}

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.submission = this.props.children.submission;
  }

  render() {
    return (
      <div>
        <h4>{this.submission.name}</h4>

        {/* Status text */}
        <Status status={this.submission.status} />
        <div>
          {/* Preview button */}
          <Button
            variant="contained"
            color={
              this.props.children.id === this.props.previewId
                ? 'secondary'
                : 'default'
            }
            onClick={
              this.props.children.id === this.props.previewId
                ? this.props.handleHide
                : () => this.props.handlePreview(this.props.children.id)
            }>
            {this.props.children.id === this.props.previewId
              ? 'Hide'
              : 'Preview'}
          </Button>{' '}
          {/* Edit button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.props.handleEdit(this.submission, this.props.children.id)
            }>
            Edit
          </Button>{' '}
          {/* Delete button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              this.props.handleDelete(
                this.submission.panorama.fileName,
                this.props.children.id,
              )
            }>
            Delete
            <DeleteIcon />
          </Button>
        </div>
        <br />
        <div style={{color: 'gray', fontSize: '80%'}}>
          Submitted:{' '}
          {this.submission.date.toDate().toLocaleString('default', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </div>
        <br />
        {this.props.children.id === this.props.previewId && (
          <Preview submission={this.submission} />
        )}
      </div>
    );
  }
}

class Submitted extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      previewId: '',
      loading: true,
      sortBy: 'status',
    };

    // Read all of current user's submissions from firestore, then adds all
    // submissions into state.
    let submissions = [];
    this.props.doc
      .collection('submissions')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => {
          submissions.push({submission: doc.data(), id: doc.id});
        }),
      )
      .then(() => {
        // Sorts by status
        submissions.sort(compareByStatus);
        this.setState({submissions, loading: false});
      });

    this.handlePreview = this.handlePreview.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
  }

  handlePreview(docId) {
    this.setState({
      previewId: docId,
    });
  }

  handleHide() {
    this.setState({previewId: ''});
  }

  handleSorting(event) {
    let submissions = this.state.submissions.slice();

    switch (event.target.value) {
      case 'name':
        submissions.sort(compareByName);
        break;
      case 'date':
        submissions.sort(compareByDate);
        break;
      case 'status':
        submissions.sort(compareByStatus);
        break;
      default:
        break;
    }

    this.setState({submissions, sortBy: event.target.value});
  }

  render() {
    return (
      <div>
        {/* Loading message */}
        {this.state.loading && <span>Loading... ...</span>}
        {!this.state.loading && this.state.submissions.length === 0 && (
          <span>You have not created any submissions (yet!)</span>
        )}

        {!this.state.loading && this.state.submissions.length !== 0 && (
          <div>
            <br />
            <SubmissionsSortingDropdown
              key={this.state.sortBy}
              value={this.state.sortBy}
              handleSorting={this.handleSorting}
            />
            <Table>
              <TableBody>
                {this.state.submissions.map((x, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Submission
                        key={this.state.sortBy}
                        handleEdit={this.props.handleEdit}
                        handleDelete={this.props.handleDelete}
                        handlePreview={this.handlePreview}
                        handleHide={this.handleHide}
                        previewId={this.state.previewId}>
                        {x}
                      </Submission>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}
export default Submitted;
