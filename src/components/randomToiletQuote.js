import React from 'react';
import firebase from '../utils/firebase';

const quoteStyle = {
  color: 'gray',
  fontFamily: 'Georgia, serif',
  fontSize: '1.5em',
  fontStyle: 'italic',
  lineHeight: '1.4',
  margin: '0',
  textShadow: '0 1px white',
  zIndex: '600',
  textAlign: 'center',
};

export default class RandomToiletQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    firebase
      .firestore()
      .collection('toiletQuotes')
      .doc('quotes')
      .get()
      .then(doc => {
        const quotes = doc.data().quotes;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.setState({quote: '“' + randomQuote + '”'});
      })
      .catch(() =>
        this.setState({quote: '“Feces are meant to be released in peace.”'}),
      );
  }

  render() {
    return <p style={quoteStyle}>{this.state.quote}</p>;
  }
}
