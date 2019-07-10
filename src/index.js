import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';
import injectFonts from 'typography-inject-fonts';
import './components/input.css';

const typography = new Typography(fairyGatesTheme);
typography.injectStyles();
injectFonts(typography);

ReactDOM.render(<Main />, document.getElementById('root'));
