import React from "react";
import { Icon as KitIcon } from "react-icons-kit";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

const Icon = ({ icon, size, className, containerClassName, ...others }) => (
  <span
    className={classnames(styles.container, containerClassName)}
    {...others}
  >
    <KitIcon
      className={classnames(styles.icon_pointer, className)}
      size={size}
      icon={icon}
    />
  </span>
);

Icon.propTypes = {
  icon: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.number,
  className: PropTypes.string
};

export default Icon;
