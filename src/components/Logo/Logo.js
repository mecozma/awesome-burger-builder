import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  // One way of controlling the logo size is to pass the sise as a prop
  <div className={classes.Logo} style={{height: props.height}}> 
    <img src={burgerLogo}  alt="Sizzling Burger" />
  </div>
);

export default logo;