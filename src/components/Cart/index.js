import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./style.css";

/* FONCTION NATIVE JAVASCRIPT PERMETTANT LE FORMATAGE DIRECTE EN EUROS */
function toEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

class Cart extends React.Component {
  state = {
    shipping: 2.5,
    tip: 0
  };
  /* UPDATE TIP */
  updateTip(value) {
    const tip = this.state.tip + value;
    if (tip >= 0) {
      this.setState({
        tip
      });
    }
  }
  renderButtonCheckout() {
    if (this.props.cart.length === 0) {
      return <div className="cart-products-empty">Votre panier est vide</div>;
    }
  }
  render() {
    const products = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      products.push(
        <li className="cart-product" key={this.props.cart[i].id}>
          <div className="cart-product-buttons">
            <div
              className="btn-update-qty"
              onClick={() => {
                /* this.props.onDecrement(this.props.cart[i].id); */
                this.props.onUpdateCart(this.props.cart[i].id, -1);
              }}
            >
              -
            </div>
            {this.props.cart[i].quantity}
            <div
              className="btn-update-qty"
              onClick={() => {
                /* this.props.onIncrement(this.props.cart[i].id); */
                this.props.onUpdateCart(this.props.cart[i].id, 1);
              }}
            >
              +
            </div>
          </div>

          <div className="cart-product-label">{this.props.cart[i].label}</div>
          <div className="cart-product-price">
            {toEuro(
              (this.props.cart[i].price * this.props.cart[i].quantity).toFixed(
                2
              )
            )}
          </div>
        </li>
      );
    }

    let subtotal = 0;

    for (let i = 0; i < this.props.cart.length; i++) {
      subtotal =
        subtotal +
        this.props.cart[i].quantity * Number(this.props.cart[i].price);
    }
    let total = subtotal + this.state.shipping;

    return (
      <div className="cart">
        {this.props.cart.length ? (
          <Fragment>
            <Link
              to={{
                pathname: "/checkout",
                total: total,
                submittedCart: this.props.cart, // le tableau des produits
                restaurant: this.props.restaurant,
                tip: this.state.tip
                // transmettre des variables
              }}
            >
              <div className="button-checkout">Valider mon panier</div>
            </Link>
            <div className="cart-content">
              <ul className="cart-products">{products}</ul>
              <div className="cart-separator" />
              <div className="cart-tip">
                <span>Pourboire au livreur</span>
                <div className="cart-tip-buttons">
                  <div
                    className="btn-update-tip"
                    onClick={() => {
                      this.updateTip(-0.5);
                    }}
                  >
                    -
                  </div>
                  <div
                    className="btn-update-tip"
                    onClick={() => {
                      this.updateTip(0.5);
                    }}
                  >
                    +
                  </div>
                </div>
                <span className="cart-product-price">
                  {this.state.tip ? "🤑 " : null}
                  {toEuro(this.state.tip)}
                </span>
              </div>
              <div className="cart-subtotal">
                <span>Sous-total</span>
                <span>{toEuro(subtotal)}</span>
              </div>
              <div className="cart-total">
                <span>Total</span>
                <span>{toEuro(total)}</span>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="button-checkout cart-empty">Valider mon panier</div>
            <div className="cart-products-empty">Votre panier est vide</div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Cart;
