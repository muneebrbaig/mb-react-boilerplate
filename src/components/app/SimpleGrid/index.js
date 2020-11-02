import React from "react";
import { Card, Table, Spin } from "antd";
import Widget from "components/Widget";
import { utils } from "@mb";
import "../../../assets/styles/StrippedTable.css";

const SimpleGrid = ({
  isLoading,
  columnDefn,
  dataList,
  size = "medium",
  rowKey = "",
  stripped = false,
  title = "&nbsp;",
  extra = null,
  pagination = false,
  onChange = () => console.log("onChange not implemented!"),
  components = null,
  tableOnly = false,
}) => {
  //if (isLoading || utils.isEmpty(dataList)) return <SimpleGridLoader />;
  if (utils.isEmpty(dataList)) return <></>;
  //console.log(dataList);
  const state = {
    bordered: false,
    loading: isLoading,
    rowKey: rowKey,
    pagination: pagination,
    size: size,
    //expandedRowRender,
    title: undefined,
    //showHeader:true,
    //footer,
    //rowSelection: {},
    // scroll: { y: 350 } //undefined
  };
  const TheTable = () => (
    <Spin spinning={isLoading} tip="loading...">
      <div className="gx-table-responsive">
        <Table
          {...state}
          columns={columnDefn}
          dataSource={dataList}
          rowClassName={(record, index) => {
            if (stripped)
              return `strip-table-row-${index % 2 ? "even" : "odd"}`;
          }}
          onChange={onChange}
          components={components}
        />
      </div>
    </Spin>
  );
  return tableOnly ? (
    <TheTable />
  ) : (
    <Widget
      styleName="gx-pink-purple-gradient-reverse gx-ch-capitalize gx-text-white gx-text-left"
      title={title}
      extra={extra}
    >
      <Card>
        <TheTable />
      </Card>
    </Widget>
  );
};

export default SimpleGrid;
