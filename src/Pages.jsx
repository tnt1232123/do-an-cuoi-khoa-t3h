import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// component Ui
import Content from './components/Content';
import { Grid, makeStyles } from '@material-ui/core';
import { Button, } from 'antd';
import firebase from 'firebase';
import Header from './components/Header'

const useStyles = makeStyles((theme) => ({
  inputLink: {
    textAlign: 'center',
    border: 'solid 2px black',
    borderRadius: '10px',
    fontSize: '2rem',
  },
  navbar: {
    width: '30%',
    marginLeft: '35%',
    marginBottom: '1rem',
    marginTop: '3rem',
    borderRadius: '10px',
    color: 'black',
    backgroundImage: 'linear-gradient(45deg, #7BFFC8 30%, #7FAAFF 90%)',
    fontFamily: 'Lucida Bright',
    fontSize:'1.5rem',
    height: '7rem',
    color: '#AD173A',
    fontWeight: 'bold',
    textAlign: 'center'
  },
}));

export default function Pages() {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(true);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };
  return (
    <React.Fragment>
      <Router>
        {!showInput ?
          <Grid>
            <nav>
              <Link to="/input"><Button variant="contained" color="primary" disableElevation onClick={handleShowInput} className={classes.navbar}>
                <h1 >CLICK TO CREATE WORK</h1></Button></Link>
            </nav>
            {/* <Content /> */}
          </Grid>
          :
          <Grid>
            <nav>
              <Link to="/page"><Button variant="contained" color="primary" disableElevation onClick={handleShowInput} className={classes.navbar}>
                <h1 >CLICK TO SHOW WORKS</h1></Button></Link>
            </nav>
            {/* <Header /> */}
          </Grid>
        }
        <Switch>
          <Route path="/input">
            <Content />
          </Route>
          <Route path='/page'>
            <Header />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}
