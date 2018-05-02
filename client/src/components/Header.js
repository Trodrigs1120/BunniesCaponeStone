import React from 'react';

const Header = (props) => (
  <header className="row split y-center">
    <h3>Logo</h3>
    <nav>
      <span>{props.name ? props.name : 'Log In'}</span>
    </nav>
  </header>
);

export default Header;