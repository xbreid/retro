import React from 'react';
import IconGit from 'react-icons/lib/fa/github';

// style
import './style.scss';

const blankBlock = {
  boxSizing: 'border-box',
  content: '" "',
  display: 'table'
};

const footerText = {
  color: 'rgba(255, 255, 255, 0.54)'
};

const link = {
  color: 'white'
};

const git = {
  textDecoration: 'none',
  color: 'white'
};

export default () => (
  <div className="footer-container">
    <div style={blankBlock}/>
    <p style={footerText}>ReactPM is developed by <a style={link} href="http://brandonreid.io">Brandon Reid</a> in Denton, Texas.</p>
    <a style={git} href="https://www.github.com/bar0191/retro">
      <IconGit size="27" />
    </a>
    <div style={blankBlock}/>
  </div>
);