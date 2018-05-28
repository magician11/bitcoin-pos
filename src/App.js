import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
const axios = require('axios');
const moment = require('moment');
const btcLogo = require('./images/Bitcoin.png');

const magicNumber = 11;
const styles = theme => ({
  paper: {
    padding: magicNumber * 2,
    margin: magicNumber
  },
  main: {
    marginTop: magicNumber
  },
  input: {
    fontSize: magicNumber * 3
  },
  inputLabel: {
    fontSize: magicNumber * 2
  },
  logo: {
    width: magicNumber * 4,
    marginRight: magicNumber
  },
  loader: {
    fontSize: magicNumber * 3,
    margin: magicNumber * 2
  },
  footer: {
    marginBottom: magicNumber
  }
});

class App extends Component {
  state = {
    numberFormat: '',
    currency: '',
    error: null,
    btcAddress: '',
    loading: true
  };

  // derived from https://stackoverflow.com/a/2880929/2813041
  getURLparams = () => {
    const pl = /\+/g;
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = s => decodeURIComponent(s.replace(pl, ' '));
    const query = window.location.search.substring(1);

    const urlParams = {};
    let match;
    while ((match = search.exec(query))) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
  };

  componentDidMount = () => {
    const { currency, btcAddress } = this.getURLparams();

    if (currency && btcAddress) {
      this.setState({ currency, btcAddress });
      this.getExchangeRate(currency);
    }
  };

  getExchangeRate = async currency => {
    try {
      const response = await axios('https://blockchain.info/ticker');
      this.setState({
        fiatValue: response.data[currency].last,
        currencySymbol: response.data[currency].symbol,
        lastUpdated: moment(),
        loading: false
      });
    } catch (error) {
      this.setState({ error: error.response.data });
    }
  };

  handleChange = event => {
    const numberFormat = event.target.value;
    this.setState({ numberFormat });
  };

  validAmount = () =>
    this.state.numberFormat !== '' && parseFloat(this.state.numberFormat) !== 0;

  render() {
    const { classes } = this.props;
    const {
      numberFormat,
      currency,
      error,
      btcAddress,
      fiatValue,
      currencySymbol,
      lastUpdated,
      loading
    } = this.state;

    let appContent;

    if (loading) {
      appContent = <CircularProgress className={classes.loader} />;
    } else if (error) {
      appContent = (
        <Grid item xs={10} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="headline" align="center">
              {error}
            </Typography>
          </Paper>
        </Grid>
      );
    } else if (!currency || !btcAddress) {
      appContent = (
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
              To customise this app to work for you, all you need to do is
              update the URL with your desired fiat currency and Bitcoin
              address.
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
              Simply enter the sale price in your chosen currency, and
              everything else will be done for you to generate the QR code to
              allow the buyer to send the bitcoin equivalent amount to your
              bitcoin address.
            </Typography>
          </Paper>
        </Grid>
      );
    } else {
      /*
      bitcoins are divisible down to 8 decimal places
      https://en.bitcoin.it/wiki/Help:FAQ#How_divisible_are_bitcoins.3F
      */
      const btcEquiv = (numberFormat / fiatValue).toFixed(8);

      appContent = (
        <React.Fragment>
          <Grid item xs={10} md={4}>
            <Paper className={classes.paper}>
              <TextField
                label={`Amount in ${currency} (${currencySymbol})`}
                value={numberFormat}
                className={classes.input}
                autoFocus
                fullWidth
                type="number"
                onChange={this.handleChange}
                InputLabelProps={{
                  className: classes.inputLabel
                }}
                InputProps={{
                  classes: {
                    input: classes.input
                  }
                }}
              />
            </Paper>
          </Grid>
          {this.validAmount() && (
            <Grid item xs={10} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="title">QR Code</Typography>
                <img
                  src={`https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${btcAddress}?amount=${btcEquiv}`}
                  alt="QR code"
                />
                <Typography variant="body1">
                  1 BTC = {currencySymbol}
                  {fiatValue} {currency}
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Exchange rate last updated:{' '}
                  {lastUpdated.format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
                <Typography variant="body1">
                  <NumberFormat
                    value={numberFormat}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={currencySymbol}
                  />{' '}
                  {currency} = {btcEquiv} BTC
                </Typography>
                <Typography variant="caption">
                  BTC Address: {btcAddress}
                </Typography>
              </Paper>
            </Grid>
          )}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <img src={btcLogo} className={classes.logo} alt="Bitcoin logo" />
            <Typography variant="title" color="inherit">
              Bitcoin POS
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" className={classes.main}>
          {appContent}
          <Grid item xs={12} className={classes.footer}>
            <Typography variant="body1" align="center" gutterBottom>
              Questions? Email{' '}
              <a href="mailto:support@andrewgolightly.com">
                support@andrewgolighly.com
              </a>
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Source code is available on{' '}
              <a href="https://github.com/magician11/bitcoin-pos">GitHub</a>
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
