import React from "react";
import PropTypes from "prop-types";

const CardBox = ({
  heading,
  children,
  styleName,
  headingStyle,
  childrenStyle,
  separatorStyle, //= "gx-bg-success-dark",
}) => {
  return (
    <div className={`gx-card ${styleName}`}>
      {heading && (
        <div className="gx-card-head">
          {separatorStyle && (
            <div className={`gx-separator ${separatorStyle}`} />
          )}
          <h2 className={`gx-card-title ${headingStyle} `}>{heading}</h2>
        </div>
      )}
      <div className={`gx-card-body ${childrenStyle}`}>{children}</div>
    </div>
  );
};

export default CardBox;

CardBox.propTypes = {
  children: PropTypes.node.isRequired,
};

CardBox.defaultProps = {
  styleName: "",
  childrenStyle: "",
};
