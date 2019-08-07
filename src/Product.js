import React from "react";

function Product(props) {
  console.log(props.product);

  return (
    <React.Fragment>
      <div className="product-infos">
        <div className="product-card">
          <div className="product-placeholder" />
          <h2 className="product-title">{props.product.title}</h2>
          <span className="product-price">
            {parseFloat(props.product.price)} &euro;
          </span>
        </div>
        <h4>Description</h4>
        <p className="product-desc">{props.product.description}</p>
      </div>
      <div className="product-creator">
        <span className="product-username">
          {props.product.creator
            ? props.product.creator.account.username
            : null}
        </span>
      </div>
    </React.Fragment>
  );
}

export default Product;
