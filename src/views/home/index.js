import React from 'react';
import Auth from '../../auth/Auth';
import RaisedButton from 'material-ui/RaisedButton';
import './style.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LockIcon from 'react-icons/lib/md/lock-outline';
import CouchImg from '../../images/couchbase.png';
import Footer from '../../shared/footer';

const auth = new Auth();

export default class Home extends React.Component {
   constructor(props) {
     super(props);
     props.navOpen();

     this.login = this.login.bind(this);
   }

  login() {
    auth.login();
  }

  render() {

    // this is just a way of doing inline style in react
    // i think its way too messy and should just be in a css file
    // but some ppl recommend this method for pages that don't have much css
    // and only need a few inlines
    const styles = {
      home: {
        paddingTop: '102px',
      },
      titleSection: {
        padding: '72px 24px',
        boxSizing: 'border-box',
        backgroundColor: '#607D8B',
        overflow: 'hidden',
      },
      signInButton: {
        marginTop: 30,
        margin: '15px 10px'
      },
      titleInner: {
        margin: '32px auto 0px',
        textAlign: 'center',
        maxWidth: 575,
      },
      title: {
        fontWeight: 300,
        fontSize: 56,
        color: 'rgba(255, 255, 255, 0.87)',
        marginTop: 15

      },
      subtitle: {
        color: 'rgba(255, 255, 255, 0.87)',
        fontWeight: 300,
        fontSize: 24,
        lineHeight: 1.4,
        paddingTop: 35,
        marginBottom: 20,
        letterSpacing: 0
      },
      reactImg: {
        width: 200,
        height: 200
      },
      raisedBtn: {
        color: 'white',
      },
      blankBlock: {
        boxSizing: 'border-box',
        content: '" "',
        display: 'table'
      },
      couchImg: {
        height: 75,
        width: 75,
        padding: 10
      },
      authImg: {
        height: 100,
        width: 100
      },
      flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      lockIcon: {
        padding: 10
      },
      toolDesc: {
        textAlign: 'center',
        fontSize: 19
      },
      toolHeading: {
        marginRight: 20,
        fontWeight: 100
      },
      ctaText: {
        margin: 0,
        padding: 0,
        fontWeight: 100,
        fontSize: 22
      },
      ctaButton: {
        marginTop: 35
      }
    };

    return (
      <div style={styles.home}>
        <div style={styles.titleSection}>
          <div style={styles.titleInner}>
            <img style={styles.reactImg} alt="" src="http://www.reactrally.com/assets/dist/img/ReactLogo.svg"/>
            <h1 style={styles.title}>ReactPM</h1>
            <h2 style={styles.subtitle}>A simple Password Manager built using React, Auth0 and Google's Material Design</h2>
            <RaisedButton primary={true} label="Login" style={styles.signInButton} onClick={this.login.bind(this)} />
            <RaisedButton primary={true} label="Sign-up" style={styles.signInButton} onClick={this.login.bind(this)} />
          </div>
        </div>
        <div className="home-purpose">
          <div style={styles.blankBlock}/>
          <p className="statement">
            ReactPM is in initial stages of alpha and should be considered unstable. The purpose of this project is to provide the React community with examples of how to authenticate users and APIs using Auth0, use javascript encryption standards, implement Google’s Material UI, and create backend APIs to work with a Couchbase database.
          </p>
          <div style={styles.blankBlock}/>
        </div>
        <div className="tools-section">
          <Grid fluid>
            <Row>
              <Col xs={12} sm={4} md={4}>
                <div style={styles.flexCenter}>
                  <LockIcon style={styles.lockIcon} size="70"/>
                  <h2 style={styles.toolHeading}>CryptoJS</h2>
                </div>
                <p style={styles.toolDesc}>Javascript library for Strong 256bit AES encryption archives that meet today's security standards. All encryption and decryption is done on the local/device level.</p>
              </Col>
              <Col xs={12} sm={4} md={4}>
                <div style={styles.flexCenter}>
                  <img style={styles.authImg} alt="" src="https://diycode.b0.upaiyun.com/developer_organization/avatar/372.jpg"/>
                  <h2 style={styles.toolHeading}>Auth0</h2>
                </div>
                <p style={styles.toolDesc}>Auth0 provides an out-of-the-box authentication system that takes the burden off of React developers. Auth0 never stores the master password as clear text - it's always hashed (and salted) securely.</p>
              </Col>
              <Col xs={12} sm={4} md={4}>
                <div style={styles.flexCenter}>
                  <img style={styles.couchImg} alt="" src={CouchImg}/>
                  <h2 style={styles.toolHeading}>Couchbase</h2>
                </div>
                <p style={styles.toolDesc}>This project utilizes Couchbase as great example for creating backend routes and endpoints for a database. As well as how to get and post data to and from the database using axios. </p>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="cta-section">
          <div style={styles.blankBlock}/>
          <div>
            <h3 style={styles.ctaText}>Want to help make this project better? Check out the repo.</h3>
            <RaisedButton style={styles.ctaButton} primary={true} label="GITHUB" href="https://github.com/bar0191/retro"/>
          </div>
          <div style={styles.blankBlock}/>
        </div>
        <Footer/>
      </div>
    );
  }
}
