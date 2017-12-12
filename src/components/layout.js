import React from 'react';

const Menu = () => (
  <header className="navbar col-9 centered my-2">
    <section className="navbar-section">
      <a href="#" className="navbar-brand mr-2">Impresora POSOCTO</a>
    </section>
  </header>
);

const Layout = props => (
  <div className="container columns">
    <Menu />
      {props.children}
  </div>
);

export default Layout;
