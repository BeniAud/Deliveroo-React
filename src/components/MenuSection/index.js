import React, { Component } from "react";

import MenuItem from "../MenuItem";

import "./style.css";

class MenuSection extends Component {
  render() {
    let menuItemsComponents = [];
    for (let i = 0; i < this.props.menuItems.length; i++) {
      let isInCart =
        this.props.productsInCart.indexOf(this.props.menuItems[i].id) > -1;
      menuItemsComponents.push(
        <MenuItem
          id={this.props.menuItems[i].id}
          addItem={this.props.addItem}
          key={i}
          label={this.props.menuItems[i].title}
          description={this.props.menuItems[i].description}
          price={this.props.menuItems[i].price}
          imageUrl={this.props.menuItems[i].picture}
          popular={Boolean(this.props.menuItems[i].popular)}
          isInCart={isInCart}
        />
      );
    }

    return (
      <div>
        <h3>{this.props.label.toUpperCase()}</h3>
        <div className="cards-container">{menuItemsComponents}</div>
      </div>
    );
  }
}

export default MenuSection;
