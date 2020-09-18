import React from "react";
import Product from "../Product/Product";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/adlp/builder/BFF-V1-01-Hero-D-5ff78a97-f4d3-4242-9344-c1f478aff592._CB428091778_QL85_V1_.jpg"
          alt="sffffffffffffg"
        />
        <div className="home__row">
          <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
          <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
                    <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
          <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="12234545"
            title="The Lean startup: new constant Innovation"
            price={11.22}
            rating={5}
            image="https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
