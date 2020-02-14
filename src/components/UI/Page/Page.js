import React, { Fragment } from "react";

const page = props => {
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.children}
    </Fragment>
  );
};

export default page;
