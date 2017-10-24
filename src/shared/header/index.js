import React from 'react';

// style
import './style.scss';

import IconGit from 'react-icons/lib/fa/github';

const style = {
  position: 'absolute',
  right: 15,
  top: 20,
  color: 'white'
};

export default (props) => (
  <header className="site-head">
    <div className="top-bar">
      Currently in Development!
    </div>
    <a style={style} href="https://www.github.com/bar0191/retro">
      <IconGit size="27" />
    </a>
  </header>
);
