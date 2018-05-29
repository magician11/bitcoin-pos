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
import Button from '@material-ui/core/Button';
import RestartIcon from '@material-ui/icons/SettingsBackupRestore';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';
import btcLogo from './images/Bitcoin.png';

import Welcome from './Welcome';
import { coreStyles } from './styles';

const styles = () => ({ ...coreStyles });

class App extends Component {
  state = {
    fiatValue: '',
    currency: '',
    error: null,
    btcAddress: '',
    loading: true,
    showQRcode: false
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
      this.getExchangeRate();
    } else {
      this.setState({ loading: false });
    }
  };

  // handle the reset button
  reset = () => {
    this.setState({ showQRcode: false, loading: true, fiatValue: '' });
    this.getExchangeRate();
  };

  getExchangeRate = async () => {
    try {
      const response = await axios('https://blockchain.info/ticker');
      this.setState({
        fiatValueRate: response.data[this.state.currency].last,
        currencySymbol: response.data[this.state.currency].symbol,
        lastUpdated: moment(),
        loading: false
      });
    } catch (error) {
      this.setState({ error: error.response.data });
    }
  };

  generateQRcode = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    await this.getExchangeRate();
    this.setState({ showQRcode: true, loading: false });
  };

  render() {
    const { classes } = this.props;
    const {
      fiatValue,
      currency,
      error,
      btcAddress,
      fiatValueRate,
      currencySymbol,
      lastUpdated,
      loading,
      showQRcode
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
      appContent = <Welcome />;
    } else if (showQRcode) {
      /*
      bitcoins are divisible down to 8 decimal places
      https://en.bitcoin.it/wiki/Help:FAQ#How_divisible_are_bitcoins.3F
      */
      const btcEquiv = (fiatValue / fiatValueRate).toFixed(8);
      appContent = (
        <React.Fragment>
          <Grid item xs={10} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="title">QR Code</Typography>
              <img
                src={`https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${btcAddress}?amount=${btcEquiv}`}
                alt="QR code"
              />
              <Typography variant="subheading">Amount</Typography>
              <Typography variant="body1" gutterBottom>
                {btcEquiv} BTC (={' '}
                <NumberFormat
                  value={fiatValue}
                  displayType={'text'}
                  decimalScale="2"
                  fixedDecimalScale
                  thousandSeparator={true}
                  prefix={currencySymbol}
                />{' '}
                {currency})
              </Typography>
              <Typography variant="subheading">BTC Address</Typography>
              <Typography variant="body1" className={classes.smallFontSize}>
                {btcAddress}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={10} md={4}>
            <Paper className={`${classes.paper} ${classes.centerChilden}`}>
              <Typography variant="title">Start over?</Typography>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
                disabled={fiatValue === ''}
                onClick={this.reset}
              >
                <RestartIcon /> Reset
              </Button>
            </Paper>
          </Grid>
        </React.Fragment>
      );
    } else {
      appContent = (
        <Grid item xs={10} md={4}>
          <Paper className={classes.paper}>
            <form
              onSubmit={this.generateQRcode}
              className={classes.centerChilden}
            >
              <TextField
                label={`Amount in ${currency} (${currencySymbol})`}
                value={fiatValue}
                autoFocus
                fullWidth
                type="number"
                onChange={event =>
                  this.setState({ fiatValue: event.target.value })
                }
                InputLabelProps={{
                  className: classes.inputLabel
                }}
                inputProps={{
                  step: 'any',
                  className: classes.input,
                  min: 0
                }}
              />
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                disabled={fiatValue === '' || parseFloat(fiatValue) === 0}
                onClick={this.generateQRcode}
              >
                Generate QR code
              </Button>
            </form>
          </Paper>
        </Grid>
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
        </Grid>
        <Grid container justify="center" className={classes.footer}>
          {!loading &&
            currency && (
              <Grid item xs={10} md={4}>
                <Paper className={`${classes.paper} ${classes.centerChilden}`}>
                  <Typography variant="body2" gutterBottom>
                    1 BTC = {currencySymbol}
                    {fiatValueRate.toFixed(2)} {currency}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    last updated:{' '}
                    {lastUpdated.format('MMMM Do YYYY, h:mm:ss a')}
                  </Typography>
                </Paper>
              </Grid>
            )}

          <Grid item xs={12} className={classes.centerChilden}>
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
