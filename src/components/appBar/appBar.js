import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'

export default function MenuAppBar() {
  const classes = useStyles;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Git API Graph QL Test
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}