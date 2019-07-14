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
        this.submissionsDb = firebase.firestore().collection('users');
        this.toiletDb = firebase.firestore().collection('toilets');
        this.state = {
            submissions: [],
            dialogOpened: false,
            submissionToDelete: {},
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
                    users.push(user.data().uid);
                });
            })
            .then(() => {
                users.forEach(user => this.getSubmissionsForUser(user));
            })
            .catch(error => {
                alert(error);
            });
    }

    getSubmissionsForUser(user) {
        let newSubmissions = [];
        this.submissionsDb
            .doc(user)
            .collection('submissions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(submission => {
                    newSubmissions.push({
                        userUid: user,
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
                        paranomaUrl: submission.data().paranomaUrl,
                        status: submission.data().status,
                        isEditing: false
                    });
                });
            })
            .then(() => {
                this.setState(prevState => ({
                    submissions: [...prevState.submissions, newSubmissions],
                }));
            })
            .then(() => {
                this.setState(prevState => ({
                    submissions: prevState.submissions.flatMap(x => x),
                }));
                console.log(this.state.submissions);
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

                            case "Approved":

                                this.triggerDialogToConfirmApprove(submission, index)
                                break;
                            case "Edit":
                                let submissions = [...this.state.submissions];
                                submission.isEditing = true;
                                submissions[index] = submission;
                                this.setState({
                                    submissions: submissions,
                                    submissionIndex: index
                                })
                                break;
                            case "Rejected":
                                this.triggerDialogToConfirmDelete(submission, index)
                                break;
                        }
                    }}>
                    <MenuItem value={'Edit'}>Edit</MenuItem>
                    <MenuItem value={'Approved'}>Approved</MenuItem>
                    <MenuItem value={'Rejected'}>Rejected</MenuItem>
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
        // This chunk is just to update an object in the array of the state
        let submissions = [...this.state.submissions];
        let submission = this.state.submissionToApprove;
        submission.status = 'Approved';
        submissions[this.state.submissionIndex] = submission;
        // update submissions to show approved 
        this.submissionsDb
            .doc(this.state.submissionToApprove.userUid)
            .collection('submissions')
            .doc(this.state.submissionToApprove.name)
            .update({
                status: "Approved"
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
                    submissions: submissions,
                    approveDialogOpened: false,
                });
                alert(submission.name + ' has been approved!');
            });
    }
    triggerDialogToConfirmDelete(submission, index) {
        this.setState({
            submissionToDelete: submission,
            submissionIndex: index,
            deleteDialogOpened: true,
        });
    }
    deleteSubmission() {
        this.submissionsDb
            .doc(this.state.submissionToDelete.userUid)
            .collection('submissions')
            .doc(this.state.submissionToDelete.name)
            .delete()
            .then(() => {
                this.setState({
                    deleteDialogOpened: false,
                });
                this.getAllSubmissions();
                alert(this.state.submissionToDelete.name + ' has been deleted forever');
                window.location.reload();
            });
    }


    handleConfirmEdit(index) {
        let submission = this.state.submissionToEdit
        // create a new doc 
        this.submissionsDb
            .doc(this.state.submissionToEdit.userUid)
            .collection('submissions')
            .doc(this.state.tempName)
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
                name: this.state.tempName,
                paranomaUrl: submission.paranomaUrl,
            }).then(
                () => {
                    let submissions = [...this.state.submissions];
                    submission.isEditing = false;
                    submissions[this.state.submissionIndex] = submission;
                    this.submissionsDb
                        .doc(this.state.submissionToEdit.userUid)
                        .collection('submissions')
                        .doc(this.state.submissionToEdit.name)
                        .delete()
                        .then(
                            () => {
                                this.setState({
                                    submissions,
                                    refresh: true
                                })
                                alert('Successfully edited!')
                                window.location.reload()
                            }
                        ).catch(
                            error => alert(error)
                        )
                }
            )

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
                            <Button size = 'small' onClick={() => {
                                this.handleConfirmEdit(index)
                            }}> Confirm Changes </Button>
                            <Button size = 'small' onClick={() => {
                                this.setState({
                                    isEditing: false,
                                    refresh : true,
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
                        this.setState({ deleteDialogOpened: false });
                    }}
                    open={this.state.deleteDialogOpened}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {'Once you press delete there is no turning back, the submission, ' +
                                this.state.submissionToDelete.name +
                                ' will forever be gone!'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.deleteSubmission()}>Delete</Button>
                        <Button
                            onClick={() => {
                                this.setState({ deleteDialogOpened: false });
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
