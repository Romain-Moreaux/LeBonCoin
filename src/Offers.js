import React from "react";
import { Link } from "react-router-dom";

function Offers(props) {
  const offers = props.data;

  return offers.map(offer => {
    // console.log(offer);
    return (
      <div id={offer.id} key={offer.id} className="post-item">
        {offer.pictures.length > 0 ? (
          <img
            className="post-item--picture"
            src={offer.pictures[0].secure_url}
            alt={"photo de " + offer.title}
          />
        ) : (
          <div className="post-item--placeholder" />
        )}
        <div className="post-item--infos">
          <Link to={`/offer/${offer._id}`}>
            <h3
              onClick={() => {
                props.getProductOnClick(offer._id);
              }}
              className="post-item--title"
            >
              {offer.title}
            </h3>
          </Link>

          <p className="post-item--price">{parseFloat(offer.price)} &euro;</p>
        </div>
      </div>
    );
  });
}

export default Offers;
