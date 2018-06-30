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
import cx from 'classnames'
import { marginTop, paper } from '../styles';
import * as actions from '../actions';
import routes from '../constants/routes';

const styles = () => ({ marginTop, paper });

class Invoice extends Component {
  render() {
    if (this.needToRedirectTo) {
      return <Redirect to={this.needToRedirectTo} />
    }
    const {
      classes,
      currency,
      btcAddress,
      fiatValue,
      exchangeRateData
    } = this.props;
    /*
      bitcoins are divisible down to 8 decimal places
      https://en.bitcoin.it/wiki/Help:FAQ#How_divisible_are_bitcoins.3F
      */
    return (
      <React.Fragment>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="title">QR Code</Typography>
            <img
              src={this.qrCodeSrc}
              alt="QR code"
            />
            <Typography variant="subheading">Amount</Typography>
            <Typography variant="body1" gutterBottom>
              {this.btcEquiv} BTC (={' '}
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
          <Paper className={cx(classes.paper, classes.centerChilden)}>
            <Typography variant="title">All done?</Typography>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.marginTop}
              disabled={fiatValue === ''}
              onClick={this.onEnterNewSale}
            >
              <RestartIcon /> Enter new sale
            </Button>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
  onEnterNewSale = () => {
    const { history, updateFiatValue } = this.props
    history.push(routes.POINT_OF_SALE);
    updateFiatValue('');
  }
  get btcEquiv() {
    const {
      currency,
      fiatValue,
      exchangeRateData
    } = this.props;
    return (fiatValue / exchangeRateData[currency].last).toFixed(8);
  }
  get qrCodeSrc() {
    const { btcAddress } = this.props
    return `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${btcAddress}?amount=${this.btcEquiv}`
  }
  get needToRedirectTo() {
    const {
      currency,
      btcAddress,
      fiatValue,
      exchangeRateData,
    } = this.props;
    if (!btcAddress || !currency) {
      return routes.HOME
    } else if (!exchangeRateData || !fiatValue) {
      return routes.POINT_OF_SALE
    }
  }
}

const mapStateToProps = ({
  currency,
  btcAddress,
  fiatValue,
  exchangeRateData
}) => ({ currency, btcAddress, fiatValue, exchangeRateData });

export default connect(mapStateToProps, actions)(
  withRouter(withStyles(styles)(Invoice))
);
