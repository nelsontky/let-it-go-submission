import React from 'react';
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
    Input,
} from '@material-ui/core';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.submissionsDb = firebase.firestore().collection('userSubmissions');
        this.toiletDb = firebase.firestore().collection('toilets');
        this.state = {
            submissions: [],
            submissionToReject: {},
            submissionToApprove: {},
            
        };
        this.getAllSubmissions();

    }

    componentWiUpdate() {
        this.getAllSubmissions();
    }

    getAllSubmissions() {
        let users = [];
        this.submissionsDb
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(user => {
                    users.push(user.data().currentUser.uid);
                });
            })           
            .then(() => {
                users.forEach(user => this.getSubmissionsForUser(user));
            })
            .catch(error => {
                alert('Error in getting submissions: ' + error);
            });
    }

    getSubmissionsForUser(user) {
        this.submissionsDb
            .doc(user)
            .collection('submissions')
            .onSnapshot(querySnapshot => {
                let newSubmissions = [];
                // resets the submissions in state back to empty so it doesnt accumulate each time it rerenders from a change
                this.setState({
                    submissions : []
                })
                querySnapshot.forEach(submission => {                    
                    newSubmissions.push({
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
                        paranomaUrl: submission.data().panorama.paranomaUrl,

                        // editing
                        status: submission.data().status.approval,
                        remarks: submission.data().status.remarks,
                        isEditing: false
                    });
                });
                this.setState(prevState => ({
                    submissions: [...prevState.submissions, newSubmissions].flatMap(x => x),
                    refresh : !this.state.refresh
                }));
            })
            // .then(() => {
            //     // this.setState(prevState => ({
            //     //     submissions: [...prevState.submissions, newSubmissions].flatMap(x => x),
            //     // }));
            // })
            // .then(() => {
            //     // this.setState(prevState => ({
            //     //     submissions: prevState.submissions.flatMap(x => x),
            //     // }));
            //     console.log(this.state.submissions);
            // }).catch(error => alert("Error in getting submissions second function: " + error));
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

                            case "Approved":

                                this.triggerDialogToConfirmApprove(submission, index)
                                break;
                            case "Edit":
                                let submissions = [...this.state.submissions];
                                submission.isEditing = true;
                                submissions[index] = submission;
                                this.setState({
                                    submissions: submissions,
                                    submissionIndex: index,
                                    submissionToEdit: submission
                                })
                                break;
                            case "Reject":
                                this.handleRejectSubmissionClicked(submission, index);
                                break;
                        }

                    }}>
                    <MenuItem value={'Edit'}>Edit</MenuItem>
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

        let submission = this.state.submissionToApprove;
        this.submissionsDb
            .doc(this.state.submissionToApprove.userUid)
            .collection('submissions')
            .doc(this.state.submissionToApprove.name)
            .update({
                status: {
                    approval: "approved",
                    remarks : ""
                }
            })



        // submission to official toilet database
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
                alert(submission.name + ' has been approved!');
            });
    }


    handleRejectSubmissionClicked(submission, index) {
        alert(submission.name)
        this.setState({
            rejectDialogOpened: true,
            submissionToReject: submission,
            submissionIndex: index
        })

    }

    rejectSubmission() {
        // update the rejection reason in the docs 
        this.submissionsDb
            .doc(this.state.submissionToReject.userUid)
            .collection('submissions')
            .doc(this.state.submissionToReject.docId)
            .update({
                status: {
                    approval : 'rejected',
                    remarks : ''
                }
            }).then(
                () => {
                    // let submissions = [...this.state.submissions];
                    // let submission = this.state.submissionToReject;
                    // submission.status = 'rejected';
                    // submissions[this.state.submissionIndex] = submission;
                    this.setState({
                        // submissions: submissions,
                        rejectDialogOpened: false,
                    });
                }
            )
        // update the submission docs with new status

    }



    generateTable() {
        let index = -1;
        return (
            this.state.submissions.map(submission => {
                index++;
                return submission.isEditing
                    ? (<TableRow>
                        <TableCell>
                            <Input
                                defaultValue={this.state.submissions[index].name}
                                multiline
                                fullWidth
                                onChange={(event) => this.setState({
                                    tempName: event.target.value,
                                    submissionToEdit: submission
                                })}
                            />
                        </TableCell>
                        <TableCell>{submission.userUid}</TableCell>
                        <TableCell>{this.generateFacilities(submission)}</TableCell>
                        <TableCell>
                            {submission.status == undefined
                                ? 'Pending'
                                : submission.status}{' '}
                        </TableCell>
                        <TableCell>
                            <Button size='small' onClick={() => {
                                this.handleConfirmEdit(index)
                            }}> Confirm Changes </Button>
                            <Button size='small' onClick={() => {
                                let submissions = [...this.state.submissions];
                                let submission = this.state.submissionToEdit;
                                submission.isEditing = false;
                                submissions[index] = submission;

                                this.setState({
                                    submissions: submissions
                                })

                            }}> Cancel </Button>
                        </TableCell>
                    </TableRow>
                    )
                    : (
                        <TableRow>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.userUid}</TableCell>
                            <TableCell>{this.generateFacilities(submission)}</TableCell>
                            <TableCell>
                                {submission.status == undefined
                                    ? 'Pending'
                                    : submission.status}{' '}
                            </TableCell>
                            <TableCell>{this.submissionAction(index)}</TableCell>
                        </TableRow>
                    )

            })
        )
    }


    render() {

        return (
            <Paper style={{ margin: 20 }}>
                <Dialog
                    onClose={() => {
                        this.setState({ approveDialogOpened: false });
                    }}
                    open={this.state.approveDialogOpened}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {'Once you press approve the submission, ' +
                                this.state.submissionToApprove.name +
                                ' will be pushed to the main database'}
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
                            {"Do you really want to reject this submission " + this.state.submissionToReject.name + " with the comment " + this.state.comment + "?"}
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




                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>User </TableCell>
                            <TableCell>Facilities</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.generateTable()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
