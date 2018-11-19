import React, { Component } from "react";

import "./style.css";

class RestaurantDescription extends Component {
  render() {
    return (
      <div>
        <div className="description-container">
          {/* Titre et description */}
          <div className="title-description">
            <h2>{this.props.name}</h2>
            <p className="description-text">{this.props.description}</p>
          </div>
          {/* Image */}
          <div className="image-container">
            {/* J'UTILISE UN TRICK DELIVEROO POUR COMPRESSER LES IMAGES À LA VOLÉE */}
            <img
              src={`${
                this.props.imageUrl
              }?width=320&height=180&auto=webp&format=jpg&fit=crop`}
              alt="Photo restaurant"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantDescription;
