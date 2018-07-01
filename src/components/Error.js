import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { SUPPORT_EMAIL } from '../constants';

class Error extends Component {
  render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }
    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{error.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If the issue persists, please send an email to{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.reload()} color="primary">
            Try reloading
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ error }) => {
  return { error };
};

export default connect(mapStateToProps)(Error);
