import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className="navbar-nav">
      <NavigationItem link="/" className="nav-link">
        List View
        <span className="sr-only">(current)</span>
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
