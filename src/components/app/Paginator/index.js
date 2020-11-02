import React from "react";
import { Pagination, Skeleton } from "antd";

export { PagerLocation, Paginator };

const PagerLocation = {
  both: 0,
  top: 1,
  bottom: 2,
};
const Paginator = (props) => {
  const { pageInfo, location = PagerLocation.both, onChange, loading } = props;
  if (loading) {
    return <Skeleton avatar active paragraph={{ rows: 7 }} />;
  }
  const defaults = {
    hideOnSinglePage: false,
    showSizeChanger: false,
    onChange: onChange,
    current: pageInfo.Current,
    total: pageInfo.Total,
    pageSize: pageInfo.PageSize,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };
  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      {(location === PagerLocation.both || location === PagerLocation.top) && (
        <Pagination {...defaults} />
      )}
      {props.children}
      {(location === PagerLocation.both ||
        location === PagerLocation.bottom) && <Pagination {...defaults} />}
    </div>
  );
};
