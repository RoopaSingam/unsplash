import React from "react";

import { Link } from "react-router-dom";
import "./styles.css";
const ImageView = props => {
  // console.log(props.location.state.image.urls.full);
  // const {
  //   largeImageURL: image,
  //   user: owner,
  //   tags,
  //   pageURL
  // } = props.location.state.image;
  const src = props.location.state.image.urls.full;
  console.log(props.location.state.image.links.download);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="imageView__container">
            <img
              src={src}
              alt="noimage"
              className="imageView__img img-responsive"
            />

            <div className="imageView__text">
              <span>
                <a
                  href={props.location.state.image.links.download}
                  key={props.location.state.image.id}
                  target="_blank"
                >
                  Download
                </a>
              </span>

              <button className="active-recipe__button">
                <Link to="/home">Go To Home</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
