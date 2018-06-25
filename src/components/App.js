import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { marginTop } from '../styles';
import Welcome from './Welcome';
import PointOfSale from './PointOfSale';
import Invoice from './Invoice';
import Header from './Header';
import Footer from './Footer';

const styles = { marginTop };

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <Header />
          <Grid
            container
            justify="center"
            className={this.props.classes.marginTop}
          >
            <Route path="/" exact component={Welcome} />
            <Route path="/point-of-sale" component={PointOfSale} />
            <Route path="/invoice" component={Invoice} />
          </Grid>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
