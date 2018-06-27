import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { SUPPORT_EMAIL } from '../constants'
import { paper, padding } from '../styles';

const styles = () => ({ paper, padding });

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={8} className={classes.padding}>
          <Divider />
        </Grid>

        <Grid item xs={12} className={classes.padding}>
          <Typography variant="body1" gutterBottom align="center">
            Questions? Email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Source code is available on{' '}
            <a href="https://github.com/magician11/bitcoin-pos">GitHub</a>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);
