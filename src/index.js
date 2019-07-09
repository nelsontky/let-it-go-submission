import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';
import injectFonts from 'typography-inject-fonts';

const typography = new Typography(fairyGatesTheme);
typography.injectStyles();
injectFonts(typography);

ReactDOM.render(<App />, document.getElementById('root'));
