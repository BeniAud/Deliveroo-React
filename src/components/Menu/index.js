import React, { Component } from "react";

import MenuSection from "../MenuSection";
import Cart from "../Cart";
import "./style.css";

class Menu extends Component {
  render() {
    /* JE FAIS UN TABLEAU (productsInCart) À PARTIR DE `this.props.cart` QUI RASSEMBLE TOUS LES IDs DES PRODUITS DU CART, VOIR MÉTHODE MAP : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map */
    const productsInCart = this.props.cart.map(item => item.id);
    /*  */
    let menuSectionsComponents = [];
    const entries = Object.entries(this.props.menu);
    for (let i = 0; i < entries.length; i++) {
      /* JE TESTE SI LA RUBRIQUE CONTIENT DES PLATS (entries[i][1].length) AVANT DE LA PUSH */
      if (entries[i][1].length) {
        menuSectionsComponents.push(
          <MenuSection
            addItem={this.props.addItem}
            key={i}
            label={entries[i][0]}
            menuItems={entries[i][1]}
            productsInCart={productsInCart}
          />
        );
      }
    }

    return (
      <div className="menu-background">
        <div className="menu">
          <div className="menu-items">{menuSectionsComponents}</div>
          <div className="menu-cart">
            <Cart
              /* onIncrement={this.props.onIncrement}
              onDecrement={this.props.onDecrement} */
              onUpdateCart={this.props.onUpdateCart}
              cart={this.props.cart}
              restaurant={this.props.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
