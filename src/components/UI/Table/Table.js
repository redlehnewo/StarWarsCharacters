import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Table = (
  {
    className,
    bordered,
    borderless,
    hover,
    responsive,
    size,
    striped,
    ...props
  },
  ref
) => {
  const basePrefixClass = "table";

  const classes = classNames(
    className,
    basePrefixClass,
    striped && `${basePrefixClass}-striped`,
    bordered && `${basePrefixClass}-bordered`,
    borderless && `${basePrefixClass}-borderless`,
    hover && `${basePrefixClass}-hover`,
    size && `${basePrefixClass}-${size}`
  );

  const table = <table {...props} className={classes} ref={ref} />;
  if (responsive) {
    let responsiveClass = `${basePrefixClass}-responsive`;
    if (typeof responsive === "string") {
      responsiveClass = `${basePrefixClass}-${responsive}`;
    }
    return <div className={responsiveClass}>{table}</div>;
  }

  return table;
};

Table.propTypes = {
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  hover: PropTypes.bool,
  size: PropTypes.string,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default forwardRef(Table);
