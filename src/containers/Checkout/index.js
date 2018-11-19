import React from "react";
import axios from "axios";
import { Elements } from "react-stripe-elements";
import Header from "../../components/Header";
import FormElement from "../../components/FormElement";
import CheckoutForm from "../../components/CheckoutForm";
import "./style.css";

class Checkout extends React.Component {
  render() {
    console.log(this.props.location);
    let cartElements = [];
    let subTotal = 0;
    const deliveryFee = 2.5;
    let tip = 0;

    if (this.props.location.submittedCart) {
      for (let i = 0; i < this.props.location.submittedCart.length; i++) {
        cartElements.push(
          <li key={this.props.location.submittedCart[i].id}>
            <div className="qty-product">
              <span>{this.props.location.submittedCart[i].quantity}x</span>
              <span>{this.props.location.submittedCart[i].label}</span>
            </div>

            <span>{this.props.location.submittedCart[i].price}€</span>
          </li>
        );
        subTotal =
          subTotal +
          this.props.location.submittedCart[i].quantity *
            this.props.location.submittedCart[i].price;

        tip = this.props.location.tip;
        console.log(tip);
      }
    }

    return (
      <div>
        <Header />
        <div className="checkout-background">
          <div className="container">
            <div className="checkout-infos">
              <div className="restaurant-name">
                <h2>{this.props.location.restaurant}</h2>
              </div>
              <h2>Adresse de livraison</h2>
              <Elements>
                <CheckoutForm
                  tip={this.props.location.tip}
                  submittedCart={this.props.location.submittedCart}
                />
              </Elements>
            </div>
            <div className="checkout-cart-section">
              <h2>Panier</h2>
              <div className="checkout-cart">
                <div className="checkout-products">{cartElements}</div>

                <div className="checkout-subtotal-fee">
                  <div className="checkout-subtotal">
                    <span>Sous-total</span>
                    <span>{subTotal.toFixed(2)} €</span>
                  </div>
                  <div className="checkout-fee">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee} €</span>
                  </div>
                  <div className="checkout-tip">
                    <span>Pourboire au livreur</span>
                    <span>{tip}€</span>
                  </div>
                  <div className="checkout-total">
                    <span>Total</span>
                    <span>{(subTotal + deliveryFee + tip).toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
