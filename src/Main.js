import React from "react";
import Layout from './components/layout';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "./utils/firebase";
import App from "./App";
import Admin from "./Admin";

// Implement Google and Firebase signin

const uiConfig = {
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <Layout>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Layout>
      );
    }

    if (
      firebase.auth().currentUser.email == "lowzxx@gmail.com" ||
      firebase.auth().currentUser.email == "nelsontkyi@gmail.comz"
    ) {
      return (
        <div>
          <Admin />
          <div style={{ textAlign: "center" }}>
            <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <App currentUser={firebase.auth().currentUser} />
          <div style={{ textAlign: "center" }}>
            <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
          </div>
        </div>
      );
    }
  }
}
