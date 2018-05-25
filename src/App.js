import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
const queryString = require('query-string');

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
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
      prefix="$ "
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

  handleChange = event => {
    this.setState({
      numberFormat: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { numberFormat, currency, error } = this.state;

    let appContent;

    if (error) {
      appContent = (
        <Paper className={classes.paper}>
          <Typography variant="headline" align="center">
            {error}
          </Typography>
        </Paper>
      );
    } else {
      appContent = (
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
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            disabled={numberFormat === '' || parseFloat(numberFormat) === 0}
          >
            Generate QR Code
          </Button>
        </Paper>
      );
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Bitcoin POS
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={4}>
            {appContent}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
