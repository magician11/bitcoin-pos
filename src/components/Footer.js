import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { paper, padding } from '../styles';

const styles = () => ({
  paper,
  padding
});

class Footer extends Component {
  render() {
    const {
      classes,
      lastUpdated,
      exchangeRateData,
      currency,
      loading
    } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12} className={classes.padding}>
          <Divider />
        </Grid>

        {!loading && (
          <Grid item xs={12} sm={6} className={classes.padding}>
            <Typography variant="body2" gutterBottom>
              1 BTC = {exchangeRateData[currency].symbol}
              {exchangeRateData[currency].last} {currency}
            </Typography>
            <Typography variant="caption" gutterBottom>
              last updated: {lastUpdated}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sm={6} className={classes.padding}>
          <Typography variant="body1" gutterBottom align="right">
            Questions? Email{' '}
            <a href="mailto:support@andrewgolightly.com">
              support@andrewgolighly.com
            </a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Source code is available on{' '}
            <a href="https://github.com/magician11/bitcoin-pos">GitHub</a>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  exchangeRateData,
  lastUpdated,
  currency,
  loading
}) => {
  return { exchangeRateData, lastUpdated, currency, loading };
};

export default connect(mapStateToProps)(withStyles(styles)(Footer));
