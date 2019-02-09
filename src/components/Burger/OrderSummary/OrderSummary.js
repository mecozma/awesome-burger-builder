import React, {Component} from 'react';

import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

export default class OrderSummary extends Component {
  // This component could be a functional component, but I made it Class for debuging matters
  componentWillUpdate() {
    console.log('[OrderSummary WillUpdate');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return(
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      )
    })
    return(
      <Aux>
        <p>Your burger contains the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Your order price is: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

