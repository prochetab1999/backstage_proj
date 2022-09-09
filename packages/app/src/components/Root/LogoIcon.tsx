import React from 'react';
import { makeStyles } from '@material-ui/core';
import TwLogoIcon from './logo/tw.logo.icon.png';

const useStyles = makeStyles({
  logo: {
    objectFit: 'contain',
    width: 'auto',
    height: 28,
    background: 'white', 
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img className={classes.logo} src={TwLogoIcon}/>
  );
};

export default LogoIcon;