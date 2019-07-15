import React from 'react';
import Button from '@material-ui/core/Button';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {remarksShown: false};

    this.approval = this.props.status.approval;
    this.remarks = this.props.status.remarks;
  }

  render() {
    if (this.approval === 'rejected') {
      return (
        <div>
          <p style={{color: 'red'}}>
            {'Rejected '}
            <Button
              color='primary'
              onClick={() =>
                this.setState({remarksShown: !this.state.remarksShown})
              }>
                {this.state.remarksShown ? 'Hide' : 'Show reason'}
            </Button>
          </p>
          {this.state.remarksShown && <p>{this.remarks}</p>}
        </div>
      );
    } else if (this.approval === 'pending') {
      return (
        <p>
          <em>Submission pending review</em>
        </p>
      );
    } else {
      return <p style={{color: 'green'}}>Approved!</p>;
    }
  }
}
