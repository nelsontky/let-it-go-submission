import React from 'react';
import Preview from './components/preview';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from './utils/firebase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  TextField,
} from '@material-ui/core';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.submissionsDb = firebase.firestore().collection('userSubmissions');
    this.toiletDb = firebase.firestore().collection('toilets');
    this.reviewsDb = firebase.firestore().collection('reviews');
    this.state = {
      submissions: [],
      submissionToReject: {},
      submissionToApprove: {},
      remarks: '',
      previewRow: null,
    };
    this.getAllSubmissions();
  }

  getAllSubmissions() {
    let newSubmissions = [];
    const map = new Map();

    this.submissionsDb.get().then(users => {
      users.forEach(userObj => {
        let user = userObj.data().currentUser.uid;

        this.submissionsDb
          .doc(user)
          .collection('submissions')
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(submission => {
              let obj = {
                userUid: user,
                docId: submission.id,
                date: submission.data().date,
                isFemale: submission.data().facilities.female,
                isMale: submission.data().facilities.male,
                isHandicapped: submission.data().facilities.handicapped,
                isSeparateHandicapped: submission.data().facilities
                  .separateHandicapped,
                hasHose: submission.data().facilities.hose,
                hasShowerHeads: submission.data().facilities.showerHeads,
                hasWaterCooler: submission.data().facilities.waterCooler,
                lat: submission.data().lat,
                lon: submission.data().lon,
                name: submission.data().name,
                paranomaUrl: submission.data().panorama.url,

                // editing
                status: submission.data().status.approval,
                remarks: submission.data().status.remarks,
              };

              if (!map.has(obj.docId)) {
                map.set(obj.docId, true);
                newSubmissions.push(obj);
              } else {
                // if not in array then replace with the new updated one at the same position
              }
            });

            querySnapshot.docChanges().forEach(change => {
              let idToRemove = change.doc.id;
              let submissionToRemove = newSubmissions.find(
                element => element.docId === idToRemove,
              );
              let rowId = submissionToRemove.rowId;
              newSubmissions[rowId] = {
                userUid: user,
                docId: submissionToRemove.id,
                date: change.doc.data().date,
                isFemale: change.doc.data().facilities.female,
                isMale: change.doc.data().facilities.male,
                isHandicapped: change.doc.data().facilities.handicapped,
                isSeparateHandicapped: change.doc.data().facilities
                  .separateHandicapped,
                hasHose: change.doc.data().facilities.hose,
                hasShowerHeads: change.doc.data().facilities.showerHeads,
                hasWaterCooler: change.doc.data().facilities.waterCooler,
                lat: change.doc.data().lat,
                lon: change.doc.data().lon,
                name: change.doc.data().name,
                paranomaUrl: change.doc.data().panorama.url,

                // editing
                status: change.doc.data().status.approval,
                remarks: change.doc.data().status.remarks,
              };
            });

            let index = -1;
            newSubmissions.map(submission => {
              index++;
              submission.rowId = index;
              return submission;
            });
            this.setState({submissions: newSubmissions});
          });
      });
    });
  }
  generateFacilities(submission) {
    let result = '';

    if (submission.isMale) {
      result += '🙋‍♂️';
    }
    if (submission.isFemale) {
      result += '🙋‍';
    }
    if (submission.hasWaterCooler) {
      result += '🚰';
    }
    if (submission.hasShowerHeads) {
      result += '🚿';
    }
    if (submission.hasHose) {
      result += '💦';
    }
    if (submission.isHandicapped) {
      result += '♿';
    }
    if (submission.isSeparateHandicapped) {
      result += '😭';
    }
    return result;
  }
  submissionAction(index) {
    const values = {
      age: [10, 20, 30],
    };
    return (
      <FormControl>
        <Select
          value={values.age}
          onChange={event => {
            let submission = this.state.submissions[index];
            switch (event.target.value) {
              case 'Approve':
                this.triggerDialogToConfirmApprove(submission, index);
                break;
              case 'Reject':
                this.handleRejectSubmissionClicked(submission, index);
                break;
              default:
                break;
            }
          }}>
          <MenuItem value={'Approve'}>Approve</MenuItem>
          <MenuItem value={'Reject'}>Reject</MenuItem>
        </Select>
      </FormControl>
    );
  }
  triggerDialogToConfirmApprove(submission, index) {
    this.setState({
      submissionToApprove: submission,
      submissionIndex: index,
      approveDialogOpened: true,
    });
  }
  approveSubmission() {
    let remarks = this.state.remarks[this.state.submissionIndex];
    let submission = this.state.submissionToApprove;
    this.submissionsDb
      .doc(this.state.submissionToApprove.userUid)
      .collection('submissions')
      .doc(this.state.submissionToApprove.name)
      .update({
        status: {
          approval: 'approved',
          remarks: remarks,
        },
      }); // submission to official toilet database
    this.toiletDb
      .doc(submission.name)
      .set({
        facilities: {
          female: submission.isFemale,
          handicapped: submission.isHandicapped,
          hose: submission.hasHose,
          male: submission.isMale,
          separateHandicapped: submission.isSeparateHandicapped,
          showerHeads: submission.hasShowerHeads,
          waterCooler: submission.hasWaterCooler,
        },
        lat: submission.lat,
        lon: submission.lon,
        name: submission.name,
        paranomaUrl: submission.paranomaUrl,
      })
      .then(() => {
        this.setState({
          // submissions: submissions,
          approveDialogOpened: false,
        });
      }); // create a review object in the review database
    this.reviewsDb.doc(submission.name).set({});
  }
  handleRejectSubmissionClicked(submission, index) {
    this.setState({
      rejectDialogOpened: true,
      submissionToReject: submission,
      submissionIndex: index,
    });
  }
  rejectSubmission() {
    // update the rejection reason in the firestore
    let remarks = this.state.remarks[this.state.submissionIndex];
    this.submissionsDb
      .doc(this.state.submissionToReject.userUid)
      .collection('submissions')
      .doc(this.state.submissionToReject.docId)
      .update({
        status: {
          approval: 'rejected',
          remarks: remarks ? remarks : this.state.submissionToReject.remarks,
        },
      })
      .then(() => {
        this.setState({
          rejectDialogOpened: false,
        });
      });
  }
  handleTextChange(event, rowId) {
    this.setState({
      remarks: {
        [rowId]: event.target.value,
      },
    });
  }
  generateTable() {
    return this.state.submissions.map((submission, i) => {
      return (
        <React.Fragment key={i}>
          <TableRow>
            <TableCell>
              {submission.name + ' '}

              {/* Show preview button if toilet is not previewed. If toilet is
              being previewed, then show hide button */}
              {submission.rowId !== this.state.previewRow ? (
                <Button
                  onClick={() => this.setState({previewRow: submission.rowId})}
                  color="primary">
                  Preview
                </Button>
              ) : (
                <Button
                  onClick={() => this.setState({previewRow: null})}
                  color="secondary">
                  Hide
                </Button>
              )}
            </TableCell>
            <TableCell>{this.generateFacilities(submission)}</TableCell>
            <TableCell size="small">
              {
                <TextField
                  multiline
                  defaultValue={submission.remarks}
                  fullWidth
                  margin="dense"
                  inputProps={{style: {fontSize: 15}}}
                  onChange={event => {
                    this.handleTextChange(event, submission.rowId);
                  }}
                />
              }
            </TableCell>
            <TableCell>
              {submission.status == null ? 'Pending' : submission.status}{' '}
            </TableCell>
            <TableCell>{this.submissionAction(submission.rowId)}</TableCell>
          </TableRow>

          {/* Sets up preview, hacky way to fit zx 
          data structure to Nelson's */}
          {this.state.previewRow === submission.rowId && (
            <TableRow>
              <TableCell colSpan={5}>
                <Preview
                  submission={Object.assign(
                    {
                      panorama: {url: submission.paranomaUrl},
                      facilities: {
                        hose: submission.hasHose,
                        showerHeads: submission.hasShowerHeads,
                        waterCooler: submission.hasWaterCooler,
                        male: submission.isMale,
                        separateHandicapped: submission.isSeparateHandicapped,
                        handicapped: submission.isHandicapped,
                        female: submission.isFemale,
                      },
                    },
                    submission,
                  )}
                />
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      );
    });
  }
  render() {
    return (
      <Paper style={{margin: 20}}>
        <Dialog
          onClose={() => {
            this.setState({approveDialogOpened: false});
          }}
          open={this.state.approveDialogOpened}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'Do you really want to approve ' +
                this.state.submissionToApprove.name +
                ' with the remarks ' +
                (this.state.remarks[this.state.submissionIndex]
                  ? this.state.remarks[this.state.submissionIndex]
                  : this.state.submissionToApprove.remarks) +
                '?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.approveSubmission()}>Approve</Button>
            <Button
              onClick={() => {
                this.setState({approveDialogOpened: false});
              }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={() => {
            this.setState({rejectDialogOpened: false});
          }}
          open={this.state.rejectDialogOpened}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'Do you really want to reject ' +
                this.state.submissionToReject.name +
                ' with the remarks ' +
                (this.state.remarks[this.state.submissionIndex]
                  ? this.state.remarks[this.state.submissionIndex]
                  : this.state.submissionToReject.remarks) +
                '?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.rejectSubmission()}>Reject</Button>
            <Button
              onClick={() => {
                this.setState({rejectDialogOpened: false});
              }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Table onRowSelection={this.onRowSelection}>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Facilities</TableCell>
              <TableCell>Remarks </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.generateTable()}</TableBody>
        </Table>
      </Paper>
    );
  }
}
