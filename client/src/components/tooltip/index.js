import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./style.scss";

class ToolTip extends Component {
  propTypes = {
    children: PropTypes.instanceOf(PropTypes.string, PropTypes.shape),
    message: PropTypes.instanceOf(PropTypes.string, PropTypes.shape),
    containerClassName: PropTypes.string,
    toolTipClassName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  show = () => {
    this.setState({ hover: true });
  };

  hide = () => {
    this.setState({ hover: false });
  };

  render() {
    const { hover } = this.state;
    const {
      children,
      message,
      containerClassName,
      toolTipClassName
    } = this.props;
    return (
      <span
        className={classnames("toolTipContainer", containerClassName)}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        {children}
        {hover && (
          <span className={classnames("tooltip", toolTipClassName)}>
            {message}
          </span>
        )}
      </span>
    );
  }
}

export default ToolTip;
