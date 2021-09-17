import './App.css';
import React, { useEffect, useState } from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { uiConfig } from './firebase';
import Pages from './Pages';
import { makeStyles, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: '50%',
    maxHeight: '50%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    textAlign: 'center',
    marginTop: '15%',
    margin: 'auto',
    color: '#007A78'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',

  },
  headerBar: {
    backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  signOut: {
    maxWidth: '20%'
  },
  menu: {
    minWidth: '20%'
  },
  menuButton: {
    width: '4rem',
    height: '4rem'
  },
});



function App() {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  console.log('firebase.user', firebase.auth().currentUser);
  if (!isSignedIn) {
    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="h1">
                <h1 >What You Do ??</h1>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ color: 'black', fontSize: '1.5rem', fontWeight: '200' }}>
                <h4>Vui lòng đăng nhập :</h4>
              </Typography>
            </CardContent>
            <CardActions  >
              <Button size="large" color="primary" style={{ margin: 'auto' }}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </Button>
            </CardActions>
          </CardActionArea>

        </Card>
        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      </div>
    );
  }
  return (
    <div className={classes.backgroundMain}>
      <Router>
        <div >
          <AppBar position="stick" className={classes.headerBar}>
            <Toolbar>
              <CardActions className={classes.menu}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                  <a href="/" src="/" style={{ textDecoration: 'none', color: 'white' }}><HomeIcon /></a>
                </IconButton>
              </CardActions>
              <Typography variant="h4" className={classes.title}>
                <a href="/" style={{ textDecoration: 'none', color: 'white' }}>What You Do ??</a>
              </Typography>
              <CardActions className={classes.signOut}>
                <Typography style={{ float: 'right', marginRight: '1rem' }}>Xin chào : {firebase.auth().currentUser.displayName}</Typography>
                <Button onClick={() => firebase.auth().signOut()} style={{ flex: 'right', color: 'white', border: 'solid 1px black' }}>Sign-out</Button>
              </CardActions>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route path="/">
            < Pages />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
