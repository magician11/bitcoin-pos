import React, { Component } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter, Route } from 'react-router-dom';
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

import btcLogo from '../images/Bitcoin.png';
import Welcome from './Welcome';
import Header from './Header';
import Footer from './Footer';
import { marginTop } from '../styles';
import * as actions from '../actions';
import { getURLparams } from '../utils';

const styles = () => ({ marginTop });

class App extends Component {
  // handle the reset button
  // reset = () => {
  //   this.setState({ showQRcode: false, loading: true, fiatValue: '' });
  //   this.getExchangeRate();
  // };
  //
  // generateQRcode = async e => {
  //   e.preventDefault();
  //   this.setState({ loading: true });
  //   await this.getExchangeRate();
  //   this.setState({ showQRcode: true, loading: false });
  // };

  render() {
    // const { classes, btcAddress, currency, loading, error } = this.props;
    //
    // let appContent;
    //
    // if (loading) {
    //   appContent = <CircularProgress className={classes.loader} />;
    // } else if (error) {
    //   appContent = (
    //     <Grid item xs={10} md={4}>
    //       <Paper className={classes.paper}>
    //         <Typography variant="headline" align="center">
    //           {error}
    //         </Typography>
    //       </Paper>
    //     </Grid>
    //   );
    // } else if (!currency || !btcAddress) {
    //   appContent = <Welcome />;
    // } else {
    //   appContent = <p>main app ready</p>;
    // }

    // else if (showQRcode) {
    //   /*
    //   bitcoins are divisible down to 8 decimal places
    //   https://en.bitcoin.it/wiki/Help:FAQ#How_divisible_are_bitcoins.3F
    //   */
    //   const btcEquiv = (fiatValue / fiatValueRate).toFixed(8);
    //   appContent = (
    //     <React.Fragment>
    //       <Grid item xs={10} md={4}>
    //         <Paper className={classes.paper}>
    //           <Typography variant="title">QR Code</Typography>
    //           <img
    //             src={`https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${btcAddress}?amount=${btcEquiv}`}
    //             alt="QR code"
    //           />
    //           <Typography variant="subheading">Amount</Typography>
    //           <Typography variant="body1" gutterBottom>
    //             {btcEquiv} BTC (={' '}
    //             <NumberFormat
    //               value={fiatValue}
    //               displayType={'text'}
    //               decimalScale="2"
    //               fixedDecimalScale
    //               thousandSeparator={true}
    //               prefix={currencySymbol}
    //             />{' '}
    //             {currency})
    //           </Typography>
    //           <Typography variant="subheading">BTC Address</Typography>
    //           <Typography variant="body1" className={classes.smallFontSize}>
    //             {btcAddress}
    //           </Typography>
    //         </Paper>
    //       </Grid>
    //       <Grid item xs={10} md={4}>
    //         <Paper className={`${classes.paper} ${classes.centerChilden}`}>
    //           <Typography variant="title">Start over?</Typography>
    //           <Button
    //             variant="outlined"
    //             size="small"
    //             color="primary"
    //             className={classes.button}
    //             disabled={fiatValue === ''}
    //             onClick={this.reset}
    //           >
    //             <RestartIcon /> Reset
    //           </Button>
    //         </Paper>
    //       </Grid>
    //     </React.Fragment>
    //   );
    // } else {
    //   appContent = (
    //     <Grid item xs={10} md={4}>
    //       <Paper className={classes.paper}>
    //         <form
    //           onSubmit={this.generateQRcode}
    //           className={classes.centerChilden}
    //         >
    //           <TextField
    //             label={`Amount in ${currency} (${currencySymbol})`}
    //             value={fiatValue}
    //             autoFocus
    //             fullWidth
    //             type="number"
    //             onChange={event =>
    //               this.setState({ fiatValue: event.target.value })
    //             }
    //             InputLabelProps={{
    //               className: classes.inputLabel
    //             }}
    //             inputProps={{
    //               step: 'any',
    //               className: classes.input,
    //               min: 0
    //             }}
    //           />
    //           <Button
    //             variant="raised"
    //             color="primary"
    //             className={classes.button}
    //             disabled={fiatValue === '' || parseFloat(fiatValue) === 0}
    //             onClick={this.generateQRcode}
    //           >
    //             Generate QR code
    //           </Button>
    //         </form>
    //       </Paper>
    //     </Grid>
    //   );
    // }

    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <Header />
          <Grid
            container
            justify="center"
            className={this.props.classes.marginTop}
          >
            <Route path="/" exact component={Welcome} />
          </Grid>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

// const mapStateToProps = ({ loading, currency, btcAddress, error }) => {
//   return { loading, currency, btcAddress, error };
// };
//
// export default connect(mapStateToProps, actions)(withStyles(styles)(App));
export default withStyles(styles)(App);
