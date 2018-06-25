import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { paper, magicNumber, marginTop } from '../styles';
import * as actions from '../actions';

const styles = () => ({
  paper,
  centerChilden: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    fontSize: magicNumber * 3
  },
  marginTop,
  inputLabel: {
    fontSize: magicNumber * 2
  }
});

class PointOfSale extends Component {
  componentDidMount = () => {
    this.props.fetchExchangeRateData();
  };

  render() {
    const {
      classes,
      exchangeRateData,
      btcAddress,
      currency,
      fiatValue
    } = this.props;

    if (!btcAddress || !currency) {
      return <Redirect to={'/'} />;
    }

    let content;
    if (!exchangeRateData) {
      content = <CircularProgress className={classes.loader} />;
      this.props.fetchExchangeRateData();
    } else {
      content = (
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <form
              onSubmit={() => this.props.history.push('/invoice')}
              className={classes.centerChilden}
            >
              <TextField
                label={`Amount in ${currency} (${
                  exchangeRateData[currency].symbol
                })`}
                value={fiatValue}
                autoFocus
                fullWidth
                type="number"
                onChange={event =>
                  this.props.updateFiatValue(event.target.value)
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
                className={classes.marginTop}
                disabled={fiatValue === '' || parseFloat(fiatValue) === 0}
                onClick={() => this.props.history.push('/invoice')}
              >
                Generate QR code
              </Button>
            </form>
          </Paper>
        </Grid>
      );
    }
    return content;
  }
}

const mapStateToProps = ({
  exchangeRateData,
  btcAddress,
  currency,
  fiatValue
}) => {
  return { exchangeRateData, btcAddress, currency, fiatValue };
};

export default connect(mapStateToProps, actions)(
  withRouter(withStyles(styles)(PointOfSale))
);
