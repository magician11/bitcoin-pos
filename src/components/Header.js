import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
    const { classes, exchangeRateData, currency, loading } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <img src={btcLogo} className={classes.logo} alt="Bitcoin logo" />
          <Typography
            variant="title"
            color="inherit"
            className={classes.expand}
          >
            Bitcoin<br />
            <small>Point of Sale</small>
          </Typography>
          {!loading && (
            <Typography variant="body1" color="inherit">
              1 BTC = {exchangeRateData[currency].symbol}
              {exchangeRateData[currency].last.toFixed(2)} {currency}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ exchangeRateData, currency, loading }) => {
  return { exchangeRateData, currency, loading };
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
