import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import cx from 'classnames';
import WAValidator from 'wallet-address-validator';

import routes from '../constants/routes';
import { paper, magicNumber, loader } from '../styles';
import * as actions from '../actions';

const styles = theme => ({
  paper,
  loader,
  btcInputField: {
    flexBasis: (magicNumber - theme.spacing.unit) * magicNumber * magicNumber
  },
  currencyInputField: {
    flexBasis: (magicNumber + theme.spacing.unit) * magicNumber
  },
  margin: {
    margin: theme.spacing.unit
  },
  inputFields: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class Welcome extends Component {
  componentDidMount = () => {
    this.props.fetchExchangeRateData();
  };

  handleChange = event => {
    const { value, name } = event.target;
    if (name === 'currency') {
      this.props.setCurrency(value);
    } else if (name === 'btcAddress') {
      this.props.setBTCaddress(value);
    }
  };

  render() {
    const { classes, btcAddress, currency, loading, error } = this.props;

    if (loading || error) {
      return <CircularProgress className={classes.loader} />;
    }
    if (loading && btcAddress && currency) {
      return <Redirect to={routes.POINT_OF_SALE} />;
    }
    return (
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Quickly and easily generate a QR code to accept the Bitcoin
            equivalent of an amount in the fiat currency of your choice.
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            Quick setup
          </Typography>
          <Typography variant="body1" gutterBottom>
            All you need to do is set the Bitcoin address you want BTC sent to,
            and what fiat currency you want to use for your sales.
          </Typography>
          <div className={classes.inputFields}>
            <TextField
              label="Your Bitcoin address"
              value={btcAddress}
              name="btcAddress"
              error={this.isBtcAddressInvalid}
              className={cx(classes.btcInputField, classes.margin)}
              helperText={
                this.isBtcAddressInvalid &&
                'this is not a valid bitcoin address'
              }
              onChange={this.handleChange}
            />
            <FormControl
              className={cx(classes.currencyInputField, classes.margin)}
            >
              <InputLabel htmlFor="currency">Fiat currency</InputLabel>
              <Select
                value={currency}
                onChange={this.handleChange}
                inputProps={{
                  name: 'currency',
                  id: 'currency'
                }}
              >
                {this.currencies}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="raised"
            color="primary"
            className={classes.margin}
            disabled={
              btcAddress === '' || currency === '' || this.isBtcAddressInvalid
            }
            onClick={() => this.props.history.push(routes.POINT_OF_SALE)}
          >
            Begin
          </Button>
        </Paper>
      </Grid>
    );
  }

  get currencies() {
    const { exchangeRateData } = this.props;
    return Object.keys(exchangeRateData).map(currency => (
      <MenuItem value={currency} key={currency}>
        {currency} ({exchangeRateData[currency].symbol})
      </MenuItem>
    ));
  }

  get isBtcAddressInvalid() {
    const { btcAddress } = this.props;
    return !!btcAddress && !WAValidator.validate(btcAddress, 'BTC');
  }
}

const mapStateToProps = ({
  currency,
  btcAddress,
  exchangeRateData,
  loading,
  error
}) => {
  return { currency, btcAddress, exchangeRateData, loading, error };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(withStyles(styles)(Welcome)));
