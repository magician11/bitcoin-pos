import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { coreStyles } from './styles';

const styles = () => ({
  paper: {
    ...coreStyles.paper
  }
});

class Welcome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            Welcome to the Bitcoin POS
          </Typography>
          <Typography variant="subheading" gutterBottom>
            This app will quickly and easily generate a QR code for you to
            enable you to accept Bitcoin.
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            Quick setup
          </Typography>
          <Typography variant="body1" gutterBottom>
            To customise this app to work for you, all you need to do is update
            the URL with your desired fiat currency and Bitcoin address.
          </Typography>
          <Typography variant="caption" gutterBottom>
            format:
            https://bitcoin-pos.golightlyplus.com/?currency=[currency]&btcAddress=[public
            address]
          </Typography>
          <Typography variant="body1">Where:</Typography>
          <Typography variant="body1">
            * currency is an acronym like USD.{' '}
            <a href="https://blockchain.info/api/exchange_rates_api">
              View available currencies
            </a>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            * public address is your public bitcoin address.
          </Typography>
          <Typography variant="body1">
            To view a working URL demo,{' '}
            <a href="https://bitcoin-pos.golightlyplus.com/?currency=USD&btcAddress=1NmFvR5HZctvRBpHZnPoAqJ4GoVeQaMus7">
              click here
            </a>.
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            How to use the app
          </Typography>
          <Typography variant="body1" gutterBottom>
            Simply enter the sale price in your chosen currency, and everything
            else will be done for you to generate the QR code to allow the buyer
            to send the bitcoin equivalent amount to your bitcoin address.
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Welcome);
