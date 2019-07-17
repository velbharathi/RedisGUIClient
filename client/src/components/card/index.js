import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const Card = ({ children, containerClassName, noHover, width, height }) => (
  <div
    className={classnames(
      "card",
      { "card-hover": !noHover },
      containerClassName
    )}
    style={{ width, height }}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.instanceOf(
    PropTypes.string || PropTypes.shape || PropTypes.object
  ),
  containerClassName: PropTypes.string,
  noHover: PropTypes.bool,
  width: PropTypes.instanceOf(PropTypes.string || PropTypes.number),
  height: PropTypes.instanceOf(PropTypes.string || PropTypes.number)
};
export default Card;
