import React from 'react';

const Header = (props) => (
  <header className="row split y-center">
    <img src="https://res.cloudinary.com/dpworjru6/image/upload/v1524934785/favicon.png"/>
    <nav>
      <div className="navNarrow">
      <i className="fa fa-bars fa-2x"></i>
        <div className="narrowLinks">
            <a href="#">Shopping Cart</a>
            <a href="#">Recipe Page</a>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
