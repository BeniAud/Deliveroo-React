import React, { Component } from "react";
import LinesEllipsis from "react-lines-ellipsis";

import "./style.css";

/* FONCTION NATIVE JAVASCRIPT PERMETTANT LE FORMATAGE DIRECTE EN EUROS */
function toEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

class MenuItem extends Component {
  renderPopular(isPopular) {
    if (isPopular) {
      return <div className="card-popular">★ Populaire</div>;
    } else {
      return null;
    }
  }

  renderImage(url) {
    if (url) {
      return (
        /* J'UTILISE UN TRICK DELIVEROO POUR COMPRESSER LES IMAGES À LA VOLÉE */
        <img
          src={`${
            this.props.imageUrl
          }?width=96&height=96&auto=webp&format=jpg&fit=crop`}
          alt="meal photo"
        />
      );
    } else {
      return null;
    }
  }
  render() {
    const cardDescription =
      this.props.description.length > 150
        ? this.props.description.substring(0, 150) + "..."
        : this.props.description;
    return (
      <div
        className={this.props.isInCart ? "item-card-with-border" : "item-card"}
        onClick={() => {
          this.props.addItem(this.props.id, this.props.label, this.props.price);
        }}
      >
        <div className="card-content">
          <LinesEllipsis
            className="card-label"
            text={this.props.label}
            maxLine="1"
            ellipsis=" ..."
            trimRight
            basedOn="words"
          />
          {/* LinesEllipsis permet de couper la phrase au bout de X lignes. */}
          <LinesEllipsis
            className="card-description"
            text={cardDescription}
            maxLine="2"
            ellipsis=" ..."
            trimRight
            basedOn="words"
          />
          <div className="price-popular-container">
            <div className="card-price">{toEuro(this.props.price)}</div>
            {this.renderPopular(this.props.popular)}
          </div>
        </div>
        <div className="meal-image-container">
          {this.renderImage(this.props.imageUrl)}
        </div>
      </div>
    );
  }
}

export default MenuItem;
