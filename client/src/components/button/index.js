import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const Button = ({ action, children, className, ...others }) => (
  <button className={classnames(action, className)} {...others}>
    {children}
  </button>
);

Button.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  others: PropTypes.object
};

export default Button;
