const firebase = require('firebase/app');
require('firebase/firestore');
require("firebase/auth");
require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'let-it-go-submission.firebaseapp.com',
  databaseURL: 'https://let-it-go-submission.firebaseio.com',
  projectId: 'let-it-go-submission',
  storageBucket: 'let-it-go-submission.appspot.com',
  messagingSenderId: '676873668301',
  appId: '1:676873668301:web:adfb3a281bd39ead',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
