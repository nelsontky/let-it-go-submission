import React from 'react';
import Preview from './components/preview';
import SortingDropdown from './components/submissionsSortingDropdown';

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
  Avatar,
  ListItem,
  Container,
  Typography,
  IconButton,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.submissionsDb = firebase.firestore().collection('userSubmissions');
    this.toiletDb = firebase.firestore().collection('toilets');
    this.reviewsDb = firebase.firestore().collection('reviews');

    this.storage = firebase.storage();

    this.handleSorting = this.handleSorting.bind(this);

    this.state = {
      submissions: [],
      submissionToReject: {},
      submissionToApprove: {},
      remarks: '',
      previewRow: null,
      approveDialogOpened: false,
      rejectDialogOpened: false,

      sortBy: 'date',

      showAcceptedReviews: false,
    };
    this.getAllSubmissions();
  }

  getAllSubmissions() {
    let newSubmissions = [];
    const map = new Map();

    this.submissionsDb.get().then(users => {
      users.forEach(userObj => {
        let user = userObj.data().currentUser.uid;
        let userName = userObj.data().currentUser.name;
        let userPhoto = userObj.data().currentUser.photoURL;

        this.submissionsDb
          .doc(user)
          .collection('submissions')
          .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(submission => {
              let obj = {
                userUid: user,
                currentUserName: userName,
                userPhoto: userPhoto,
                docId: submission.doc.id,
                date: submission.doc.data().date,
                isFemale: submission.doc.data().facilities.female,
                isMale: submission.doc.data().facilities.male,
                isHandicapped: submission.doc.data().facilities.handicapped,
                isSeparateHandicapped: submission.doc.data().facilities
                  .separateHandicapped,
                hasHose: submission.doc.data().facilities.hose,
                hasShowerHeads: submission.doc.data().facilities.showerHeads,
                hasWaterCooler: submission.doc.data().facilities.waterCooler,
                lat: submission.doc.data().lat,
                lon: submission.doc.data().lon,
                name: submission.doc.data().name,
                paranomaUrl: submission.doc.data().panorama.url,

                // Needed for reupload of file
                panoramaFileName: submission.doc.data().panorama.fileName,

                // editing
                status: submission.doc.data().status.approval,
                remarks: submission.doc.data().status.remarks,
              };

              if (!map.has(obj.docId)) {
                map.set(obj.docId, true);
                newSubmissions.push(obj);
              } else {
                let idToRemove = submission.doc.id;
                let submissionToRemove = newSubmissions.find(
                  element => element.docId === idToRemove,
                );
                let rowId = submissionToRemove.rowId;
                newSubmissions[rowId] = obj
              }
            });


            // Sorts by date by default
            // newSubmissions.sort(compareByDate);

            let index = -1;
            newSubmissions.map(submission => {
              index++;
              submission.rowId = index;
              return submission;
            });


            this.setState({ submissions: newSubmissions });
            this.handleSorting({ target: { value: this.state.sortBy } })
          });
      });

    });

  }

  generateFacilities(submission) {
    return (
      <div style={{ textAlign: 'center' }}>
        {submission.isMale && <i className="em-svg em-man-raising-hand" />}
        {submission.isFemale && <i className="em-svg em-woman-raising-hand" />}
        {submission.hasWaterCooler && (
          <i className="em-svg em-potable_water" />
        )}{' '}
        {submission.hasShowerHeads && <i className="em-svg em-shower" />}{' '}
        {submission.hasHose && <i className="em-svg em-sweat_drops" />}{' '}
        {submission.isHandicapped && <i className="em-svg em-wheelchair" />}
      </div>
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
      .doc(this.state.submissionToApprove.docId)
      .update({
        status: {
          approval: 'approved',
          // In case of empty remarks
          remarks: remarks == null ? '' : remarks,
        },
      });

    // submission to official toilet database
    // Downloads panorama to reupload
    this.storage
      .refFromURL(submission.paranomaUrl)
      .getDownloadURL()
      .then(url => {
        // Downloading panorama
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
          const blob = xhr.response;

          // Uploading the downloaded blob
          const uploadTask = this.storage
            .ref()
            .child(`approved/${submission.panoramaFileName}`)
            .put(blob);

          uploadTask.on(
            'state_changed',
            null,
            error => console.log(error),
            () => {
              // Upload successful
              uploadTask.snapshot.ref.getDownloadURL().then(panoramaUrl => {
                // Submit to main db, changes the panoramaUrl too (This is
                // largely your original code @zx)
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
                    paranomaUrl: panoramaUrl,
                  })
                  .then(() => {
                    this.setState({
                      // submissions: submissions,
                      approveDialogOpened: false,
                    });
                  }); // create a review object in the review database
                this.reviewsDb.doc(submission.name).set({});
              });
            },
          );
        };
        xhr.open('GET', url);
        xhr.send();
      });
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
      })
      .catch((error) => {
        alert("There is an error rejecting the submission: " + error)
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
    return this.state.submissions
      .filter(unfilteredSubmission => {
        return this.state.showApprovedReviews
          ? unfilteredSubmission
          : unfilteredSubmission.status === 'pending' ||
          unfilteredSubmission.status === 'rejected';
      })
      .map((submission, i) => {
        return (
          <React.Fragment key={i}>
            <TableRow>
              <TableCell>
                <ListItem
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                  }}>
                  <Avatar src={submission.userPhoto} />
                  <Typography
                    variant="body1"
                    noWrap={true}
                    style={{ fontSize: 15, maxWidth: 120 }}>
                    <b>{submission.currentUserName}</b>
                  </Typography>
                </ListItem>
              </TableCell>
              <TableCell>
                {submission.name + ' '}

                {/* Show preview button if toilet is not previewed. If toilet is
              being previewed, then show hide button */}
                {submission.rowId !== this.state.previewRow ? (
                  <Button
                    onClick={() =>
                      this.setState({ previewRow: submission.rowId })
                    }
                    color="primary">
                    Preview
                  </Button>
                ) : (
                    <Button
                      onClick={() => this.setState({ previewRow: null })}
                      color="secondary">
                      Hide
                  </Button>
                  )}
              </TableCell>
              <TableCell>
                {submission.date.toDate().toLocaleString('default', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </TableCell>
              <TableCell>{this.generateFacilities(submission)}</TableCell>
              <TableCell size="small">
                {
                  <TextField
                    multiline
                    value={this.state.remarks[submission.rowId] === undefined ? submission.remarks : this.state.remarks[submission.rowId]}
                    margin="dense"
                    inputProps={{ style: { fontSize: 15 } }}
                    onChange={event => {
                      this.handleTextChange(event, submission.rowId)
                    }}
                  />
                }
              </TableCell>
              <TableCell>
                {submission.status == null ? 'Pending' : submission.status}{' '}
              </TableCell>
              <TableCell>
                <IconButton onClick = {() => this.triggerDialogToConfirmApprove(submission, submission.rowId)} style = {{padding:5}}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick = {() => this.handleRejectSubmissionClicked(submission, submission.rowId)} style = {{padding:5}}>
                  <ClearIcon />
                </IconButton>

              </TableCell>
            </TableRow>

            {/* Sets up preview, hacky way to fit zx 
          data structure to Nelson's */}
            {this.state.previewRow === submission.rowId && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Preview
                    submission={Object.assign(
                      {
                        panorama: { url: submission.paranomaUrl },
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

    this.setState({ submissions, sortBy: event.target.value });
  }

  render() {
    return (
      <Container style={{ padding: 0, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.setState({
              showApprovedReviews: !this.state.showApprovedReviews,
            })
          }>
          {(this.state.showApprovedReviews ? 'Hide ' : 'Show ') +
            'Approved Reviews'}
        </Button>
        <Paper style={{ margin: 20 }}>
          <Dialog
            onClose={() => {
              this.setState({ approveDialogOpened: false });
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
                  this.setState({ approveDialogOpened: false });
                }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={() => {
              this.setState({ rejectDialogOpened: false });
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
                  this.setState({ rejectDialogOpened: false });
                }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <SortingDropdown
            value={this.state.sortBy}
            handleSorting={this.handleSorting}
          />

          <Table style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Facilities</TableCell>
                <TableCell>Remarks </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.generateTable()}</TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }
}

// Comparators
function compareByName(a, b) {
  return a.name.localeCompare(b.name);
}

function compareByDate(a, b) {
  return b.date.toDate() - a.date.toDate();
}

function compareByStatus(a, b) {
  let aValue;
  let bValue;

  switch (a.status) {
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

  switch (b.status) {
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
