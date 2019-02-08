import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p> The Price is: <strong>$ {props.price.toFixed(2)}</strong></p>
    {controls.map(el => (
      <BuildControl 
        key={el.label} 
        label={el.label}
        added={() => props.ingredientAdded(el.type)}
        removed={() => props.ingredientRemoved(el.type)}
        disabled={props.disabled[el.type]} />
    ))}
    <button
      onClick={props.purchasing}
      className={classes.OrderButton}
      disabled={!props.purchaseable}>Order Now</button>
  </div>
)

export default buildControls;