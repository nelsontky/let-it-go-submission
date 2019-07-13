import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from './utils/firebase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import { DialogContent, DialogTitle, Dialog, DialogActions, DialogContentText } from '@material-ui/core';





export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.submissionsDb = firebase.firestore().collection('users');
        this.toiletDb = firebase.firestore().collection('toilets');
        this.state = {
            submissions: [],
            dialogOpened: false,
            submissionToDelete: {},
            submissionToApprove: {}
        }
        this.getAllSubmissions();
        // this.getToiletData();
    }

    componentWilMount() {
    }


    getAllSubmissions() {
        let users = [];
        this.submissionsDb.get().then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    (user) => {
                        users.push(user.data().uid)
                    }
                )
            }
        ).then(
            () => {
                users.forEach(
                    (user) => this.getSubmissionsForUser(user)
                )
            }

        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    getSubmissionsForUser(user) {
        let newSubmissions = []
        this.submissionsDb.doc(user).collection('submissions').get().then(
            (querySnapshot) => {

                querySnapshot.forEach(
                    (submission) => {
                        newSubmissions.push({
                            userUid: user,
                            isFemale: submission.data().facilities.female,
                            isMale: submission.data().facilities.male,
                            isHandicapped: submission.data().facilities.handicapped,
                            isSeparateHandicapped: submission.data().facilities.separateHandicapped,
                            hasHose: submission.data().facilities.hose,
                            hasShowerHeads: submission.data().facilities.showerHeads,
                            hasWaterCooler: submission.data().facilities.waterCooler,
                            lat: submission.data().lat,
                            lon: submission.data().lon,
                            name: submission.data().name,
                            paranomaUrl: submission.data().paranomaUrl,
                            status: submission.data().status
                        })
                    }
                )

            }
        ).then(
            () => {
                this.setState(prevState => ({
                    submissions: [...prevState.submissions, newSubmissions]
                }))
            }
        ).then(
            () => {
                this.setState(prevState => ({
                    submissions: prevState.submissions.flatMap(x => x)
                }))
                console.log(this.state.submissions)

            }
        )
    }

    generateFacilities(submission) {
        let result = ''
        if (submission.isMale) {
            result += '🙋‍♂️'
        }
        if (submission.isFemale) {
            result += '🙋‍'
        }
        if (submission.hasWaterCooler) {
            result += '🚰'
        }
        if (submission.hasShowerHeads) {
            result += '🚿'
        }
        if (submission.hasHose) {
            result += '💦'
        }
        if (submission.isHandicapped) {
            result += '♿'
        }
        if (submission.isSeparateHandicapped) {
            result += '😭'
        }
        return result;
    }




    submissionAction(index) {
        const values = {
            age: [10, 20, 30]
        }
        return (
            <FormControl>
                <Select
                    value={values.age}
                    onChange={(event) => {
                        let submission = this.state.submissions[index]
                        // let items = [...this.state.submissions];
                        // let item = { ...items[index] }
                        // item.status = event.target.value
                        // items[index] = item
                        event.target.value == "Approved" ? this.triggerDialogToConfirmApprove(submission, index) : this.triggerDialogToConfirmDelete(submission, index)
                        // this.setState({
                        //     submissions: items
                        // })
                    }}
                >
                    <MenuItem value={'Approved'}>Approved</MenuItem>
                    <MenuItem value={'Rejected'}>Rejected</MenuItem>
                </Select>

            </FormControl>
        )
    }

    triggerDialogToConfirmApprove(submission, index) {
        this.setState({
            submissionToApprove: submission,
            submissionIndex: index,
            approveDialogOpened: true
        })

    }

    approveSubmission() {
        // This chunk is just to update an object in the array of the state
        let submissions = [...this.state.submissions]
        let submission = this.state.submissionToApprove
        alert(submission)
        submission.status = "Approved"
        submissions[this.state.submissionIndex] = submission

        this.toiletDb.doc(submission.name).set({
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
            paranomaUrl: submission.paranomaUrl
        }).then(
            () => {
                this.setState({ 
                    submissions: submissions,
                    approveDialogOpened : false  
                })
                alert(submission.name + " has been approved!")
            }
        )
    }

    triggerDialogToConfirmDelete(submission, index) {
        this.setState({
            submissionToDelete: submission,
            submissionIndex : index,
            deleteDialogOpened: true
        })

    }


    deleteSubmission() {

        this.submissionsDb.doc(this.state.submissionToDelete.userUid)
            .collection('submissions')
            .doc(this.state.submissionToDelete.name)
            .delete()
            .then(() => {
                this.setState({ 
                    deleteDialogOpened: false,
                })
                this.getAllSubmissions()
                alert(this.state.submissionToDelete.name + " has been deleted forever")
                window.location.reload()
            })
            
    }

    render() {
        let index = -1;
        return (

            <Paper style={{ margin: 20 }}>
                <Dialog
                    onClose={() => { this.setState({ approveDialogOpened: false }) }}
                    open={this.state.approveDialogOpened}
                >
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{"Once you press approve the submission, " + this.state.submissionToApprove.name + " will be pushed to the main database"}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.approveSubmission()}>
                            Approve
                        </Button>
                        <Button onClick={() => { this.setState({ approveDialogOpened: false }) }}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    onClose={() => { this.setState({ deleteDialogOpened: false }) }}
                    open={this.state.deleteDialogOpened}
                >
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{"Once you press delete there is no turning back, the submission, " + this.state.submissionToDelete.name + " will forever be gone!"}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.deleteSubmission()}>
                            Delete
                        </Button>
                        <Button onClick={() => { this.setState({ deleteDialogOpened: false }) }}>
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
                        {this.state.submissions.map(
                            (submission) => {
                                index++
                                return (
                                    <TableRow>
                                        <TableCell>{submission.name}</TableCell>
                                        <TableCell>{submission.userUid}</TableCell>
                                        <TableCell>{this.generateFacilities(submission)}</TableCell>
                                        <TableCell>{submission.status == undefined ? 'Pending' : submission.status} </TableCell>
                                        <TableCell>{this.submissionAction(index)}</TableCell>
                                    </TableRow>)
                            }
                        )}
                    </TableBody>
                </Table>
            </Paper>



        )
    }


}

