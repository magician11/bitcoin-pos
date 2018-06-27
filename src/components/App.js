import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import routes from '../constants/routes'
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
            <Route path={routes.HOME} exact component={Welcome} />
            <Route path={routes.POINT_OF_SALE} component={PointOfSale} />
            <Route path={routes.INVOICE} component={Invoice} />
          </Grid>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
