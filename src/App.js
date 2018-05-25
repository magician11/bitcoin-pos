import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
const queryString = require('query-string');
const axios = require('axios');
const btcLogo = require('./images/Bitcoin.png');

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    width: 200
  },
  input: {
    fontSize: 33
  },
  logo: {
    width: 44,
    marginRight: 11
  }
});

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      allowNegative={false}
    />
  );
};

class App extends Component {
  state = {
    numberFormat: '',
    currency: '',
    error: null,
    btcAddress: ''
  };

  componentDidMount = () => {
    const { currency, btcAddress } = queryString.parse(window.location.search);

    if (currency && btcAddress) {
      this.setState({ currency, btcAddress });
    } else {
      this.setState({
        error:
          'This app requires both a currency and a btcAddress parameter in the URL.'
      });
    }
  };

  getBtcEquivalent = numberFormat => {
    const { currency } = this.state;

    axios(
      `https://blockchain.info/tobtc?currency=${currency}&value=${parseFloat(
        numberFormat
      )}`
    )
      .then(response => {
        this.setState({
          btcEquiv: response.data
        });
      })
      .catch(error => {
        this.setState({ error: error.response.data });
      });
  };

  handleChange = event => {
    const numberFormat = event.target.value;
    this.setState({ numberFormat });
    if (numberFormat) {
      this.getBtcEquivalent(numberFormat);
    }
  };

  validAmount = () =>
    this.state.numberFormat !== '' && parseFloat(this.state.numberFormat) !== 0;

  render() {
    const { classes } = this.props;
    const { numberFormat, currency, error, btcAddress, btcEquiv } = this.state;

    let appContent;

    if (error) {
      appContent = (
        <Grid item xs={10} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="headline" align="center">
              {error}
            </Typography>
          </Paper>
        </Grid>
      );
    } else {
      appContent = (
        <React.Fragment>
          <Grid item xs={10} md={4}>
            <Paper className={classes.paper}>
              <TextField
                label={`Amount in ${currency}`}
                value={numberFormat}
                className={classes.input}
                autoFocus
                fullWidth
                onChange={this.handleChange}
                InputProps={{
                  inputComponent: NumberFormatCustom,
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
                  BTC equivalent: {btcEquiv}
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
        <Grid container justify="center">
          {appContent}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
