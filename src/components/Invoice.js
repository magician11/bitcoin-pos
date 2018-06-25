import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import RestartIcon from '@material-ui/icons/SettingsBackupRestore';
import { marginTop, paper } from '../styles';
import * as actions from '../actions';

const styles = () => ({ marginTop, paper });

class Invoice extends Component {
  render() {
    const {
      classes,
      currency,
      btcAddress,
      fiatValue,
      exchangeRateData
    } = this.props;
    if (!btcAddress || !currency) {
      return <Redirect to={'/'} />;
    } else if (!exchangeRateData || !fiatValue) {
      return <Redirect to={'/point-of-sale'} />;
    }

    /*
      bitcoins are divisible down to 8 decimal places
      https://en.bitcoin.it/wiki/Help:FAQ#How_divisible_are_bitcoins.3F
      */
    const btcEquiv = (fiatValue / exchangeRateData[currency].last).toFixed(8);
    return (
      <React.Fragment>
        <Grid item xs={12} md={4}>
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
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator={true}
                prefix={exchangeRateData[currency].symbol}
              />{' '}
              {currency})
            </Typography>
            <Typography variant="subheading">BTC Address</Typography>
            <Typography variant="body1">{btcAddress}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={10} md={4}>
          <Paper className={`${classes.paper} ${classes.centerChilden}`}>
            <Typography variant="title">All done?</Typography>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.marginTop}
              disabled={fiatValue === ''}
              onClick={() => {
                this.props.history.push('/point-of-sale');
                this.props.updateFiatValue('');
              }}
            >
              <RestartIcon /> Enter new sale
            </Button>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  currency,
  btcAddress,
  fiatValue,
  exchangeRateData
}) => {
  return { currency, btcAddress, fiatValue, exchangeRateData };
};

export default connect(mapStateToProps, actions)(
  withRouter(withStyles(styles)(Invoice))
);
