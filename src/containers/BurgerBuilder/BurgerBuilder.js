import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary';

export default class BurgerBuilder extends Component {
  render() {
    return(
      <Aux>
        <div>Burger</div>
        <div>Build Controls</div>
      </Aux>
    );
  }
}