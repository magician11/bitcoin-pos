import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { magicNumber } from '../styles';
import btcLogo from '../images/Bitcoin.png';

const styles = () => ({
  logo: {
    width: magicNumber * 4,
    marginRight: magicNumber
  },
  expand: {
    flex: 1
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <img
            src={btcLogo}
            className={this.props.classes.logo}
            alt="Bitcoin logo"
          />
          <Typography
            variant="title"
            color="inherit"
            className={classes.expand}
          >
            Bitcoin{' '}
            <Typography variant="subheading" color="inherit">
              Point of Sale
            </Typography>
          </Typography>
          <Typography variant="body1" color="inherit" align="right">
            1 BTC = $ 1000.89 USD
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
