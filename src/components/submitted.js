import React from 'react';
import Preview from './preview';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.submission = this.props.children.submission;
  }

  render() {
    return (
      <div>
        <h4>{this.submission.name}</h4>
        <div>
          {/* Edit button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.props.handleEdit(this.submission, this.props.children.id)
            }>
            Edit
          </Button>
          {/* Preview button */}
          <Button
            variant="contained"
            color={
              this.props.children.id === this.props.previewId
                ? 'default'
                : 'secondary'
            }
            onClick={
              this.props.children.id === this.props.previewId
                ? this.props.handleHide
                : () => this.props.handlePreview(this.props.children.id)
            }>
            {this.props.children.id === this.props.previewId
              ? 'Hide'
              : 'Preview'}
          </Button>
        </div>
        <br />
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

    this.state = {submissions: [], previewId: ''};

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

    this.handlePreview = this.handlePreview.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handlePreview(docId) {
    this.setState({
      previewId: docId,
    });
  }

  handleHide() {
    this.setState({previewId: ''});
  }

  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.state.submissions.map((x, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Submission
                    key={i}
                    handleEdit={this.props.handleEdit}
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
    );
  }
}
export default Submitted;
