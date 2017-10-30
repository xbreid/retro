import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import SiteIcon from 'react-icons/lib/md/language';
import WrenchIcon from 'react-icons/lib/md/build';
import ExitIcon from 'react-icons/lib/md/exit-to-app';
import Auth from '../../auth/Auth';

import './style.scss';

const auth = new Auth();

const NavHead = (props) => (
  <header>
    <div className="top-bar-nav">

    </div>
    <Link className="site-head" to="/#">
      <p className="logo-nav">ReactPM</p>
    </Link>
  </header>

);

const style = {
  marginTop: 110
};

const linkStyle = {
  textDecoration: 'none'
};

const logoutStyle = {
  bottom: 0,
  position: 'absolute',
  width: '100%'
};

const logout = () => {
  auth.logout();
};

export default (props) => (
  <Drawer open={props.open}>
    <NavHead/>
    <div style={style}>
      <Link style={linkStyle} to="vault">
        <MenuItem>
        <SiteIcon className="nav-icons" size="35"/>
        <span className="name">Sites</span>
        </MenuItem>
      </Link>
      <Link style={linkStyle} to="generator">
        <MenuItem>
          <WrenchIcon className="nav-icons" size="35"/>
          <span className="name">Generator</span>
        </MenuItem>
      </Link>
    </div>
      {
        auth.isAuthenticated() && (
          <MenuItem onClick={logout} style={logoutStyle}>
            <ExitIcon className="nav-icons" size="35"/>
            <span className="name">Log out</span>
          </MenuItem>
        )
      }
  </Drawer>
);