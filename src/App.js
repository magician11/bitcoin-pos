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

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
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
    currency: 'USD'
  };

  handleChange = event => {
    this.setState({
      numberFormat: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { numberFormat, currency } = this.state;
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
          <Grid item xs={10} sm={6}>
            <Paper className={classes.paper}>
              <TextField
                label={`Amount in ${currency}`}
                value={numberFormat}
                autoFocus
                fullWidth
                onChange={this.handleChange}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom
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
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
