import React, { Component } from "react";
import axios from "axios";

import Header from "../../components/Header";
import RestaurantDescription from "../../components/RestaurantDescription";
import Menu from "../../components/Menu";
import "./style.css";

class Restaurant extends Component {
  state = {
    restaurant: {},
    menu: {},
    cart: []
  };

  render() {
    return (
      <div>
        <Header />
        <RestaurantDescription
          name={this.state.restaurant.name}
          description={this.state.restaurant.description}
          imageUrl={this.state.restaurant.picture}
        />
        <div className="content">
          <Menu
            name={this.state.restaurant.name}
            menu={this.state.menu}
            cart={this.state.cart}
            /* onDecrement={id => {
              const newCart = [...this.state.cart];

              for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].id === id) {
                  if (newCart[i].quantity > 1) {
                    newCart[i].quantity--;
                  } else {
                    newCart.splice(i, 1);
                  }
                }
              }

              this.setState({
                cart: newCart
              });
            }}
            onIncrement={id => {
              const newCart = [...this.state.cart];

              for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].id === id) {
                  newCart[i].quantity++;
                }
              }

              this.setState({
                cart: newCart
              });
            }} */
            onUpdateCart={(id, value) => {
              const newCart = [...this.state.cart];
              for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].id === id) {
                  newCart[i].quantity += value;
                  if (newCart[i].quantity === 0) {
                    newCart.splice(i, 1);
                  }
                }
              }
              this.setState({
                cart: newCart
              });
            }}
            addItem={(id, label, price) => {
              const newCart = [...this.state.cart];

              let productAlreadyAdded = false;
              for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].id === id) {
                  newCart[i].quantity++;
                  productAlreadyAdded = true;
                }
              }
              if (productAlreadyAdded === false) {
                newCart.push({
                  id: id,
                  label: label,
                  price: price,
                  quantity: 1
                });
              }
              this.setState({
                cart: newCart
              });
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      this.setState({
        restaurant: response.data.restaurant,
        menu: response.data.menu
      });
    });
  }
}

export default Restaurant;
