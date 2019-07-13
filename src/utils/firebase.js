const firebase = require('firebase/app');
require('firebase/firestore');
require("firebase/auth");
require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "let-it-go-e6229.firebaseapp.com",
  databaseURL: "https://let-it-go-e6229.firebaseio.com",
  projectId: "let-it-go-e6229",
  storageBucket: "let-it-go-e6229.appspot.com",
  messagingSenderId: "917575844853",
  appId: "1:917575844853:web:88ec0cbe059a0d43",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
