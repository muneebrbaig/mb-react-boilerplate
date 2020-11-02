import React from "react";
import PropTypes from "prop-types";

const WidgetHeader = ({title, extra, styleName}) => {

  return (
    <h2 className={`gx-entry-title gx-text-primary ${styleName}`}>
      {title}
      {/* <span className="gx-text-primary gx-fs-md gx-pointer gx-ml-auto gx-d-none gx-d-sm-block">{extra}</span> */}
      <span className="gx-text-primary gx-fs-md gx-pointer gx-ml-auto  gx-d-sm-block">{extra}</span>
    </h2>
  )
};

WidgetHeader.defaultProps = {
  styleName: '',
};

WidgetHeader.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
};

export default WidgetHeader;
