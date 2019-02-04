import React, {Component} from "react";

import classes from "./BurgerIngredients.css";
import PropTypes from "prop-types";
export default class BurgerIngredient extends Component {
  render() {

    let ingredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      case "bakon":
        ingredient = <div className={classes.Bakon} />;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}; 

BurgerIngredient.PropTypes = {
  type: PropTypes.string.isRequired
}


