import React from 'react';
import Layout from './components/layout';
import RandomToiletQuote from './components/randomToiletQuote';
import SwitchPortals from './components/switchPortals';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from './utils/firebase';
import App from './App';

import Button from '@material-ui/core/Button';

function isNelsonOrZx(email) {
  return email === 'lowzxx@gmail.com' || email === 'nelsontkyi@gmail.com';
}

// Implement Google and Firebase signin

const uiConfig = {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({isSignedIn: !!user}));
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <Layout>
          <h1>Submit to Let It Go</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <RandomToiletQuote />
        </Layout>
      );
    } else {
      return (
        <div>
          <Layout>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => firebase.auth().signOut()}>
              Sign Out
            </Button>
          </Layout>

          {/* Give option to switch portals if is admin logging in, else just
          show the submission portal */}
          {isNelsonOrZx(firebase.auth().currentUser.email) ? (
            <SwitchPortals currentUser={firebase.auth().currentUser} />
          ) : (
            <App currentUser={firebase.auth().currentUser} />
          )}
        </div>
      );
    }
  }
}
