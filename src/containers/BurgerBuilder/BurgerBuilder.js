import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1.5,
  bacon: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-47fbf.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  updatePurchaseState(ingredients) {
    
    // My way of summing the ingredients
    // let sum = 0;
    // for (let i in ingredients) {
    //     sum += ingredients[i];
    // }
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
      this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount < 1) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert('Your oder has been received');
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Mr. Burger',
        address: {
          street: 'Cow Lane',
          zipCode: 6115,
          country: 'Sauce Land'
        },
        email: "hot-wings@bbq.com"
      },
      deliveryMethod: 'fast'
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if(this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          purchasing={this.purchaseHandler}
          price={this.state.totalPrice}
          />;
    </Aux>;
    orderSummary = <OrderSummary 
    price={this.state.totalPrice}
    ingredients={this.state.ingredients}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler} />;
    }
       
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return(
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);