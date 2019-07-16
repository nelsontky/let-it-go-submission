import React from 'react';
import Admin from '../Admin';
import App from '../App';

import Button from '@material-ui/core/Button';

export default class SwitchPortals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAdmin: true};
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <Button
            onClick={() => this.setState({isAdmin: !this.state.isAdmin})}
            variant="contained"
            color="secondary">
            {`Switch to ${this.state.isAdmin ? 'submission' : 'admin'} portal`}
          </Button>
        </div>
        {!this.state.isAdmin ? (
          <App currentUser={this.props.currentUser} />
        ) : (
          <Admin />
        )}
      </div>
    );
  }
}
