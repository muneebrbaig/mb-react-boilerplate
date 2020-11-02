import React from "react";
import { Select } from "antd";

import Widget from "components/Widget/index";
import { ui } from "@mb";
import { utils } from "@mb";

const Sessions = ({ onHandleSessionChange, data, title, message, highlight }) => {
  const options = ui.getDrowpdownOptions(data, {}, "sessionId", "session");
console.log(data[0]);
  return (
    <Widget styleName="gx-widget-bg">
      <span className="gx-widget-badge">{title}</span>
      
  {utils.isEmpty(highlight) ?
    <p>
        <i className="icon icon-chart gx-fs-xlxl" /> &nbsp; {message} 
    </p> : <p>
        <i className="icon icon-chart gx-fs-xlxl" /> &nbsp; <mark> {message} </mark>
    </p>}
      
      {utils.isEmpty(data) ? (
        <Select loading style={{ width: "100%" }} />
      ) : (
        <Select
          defaultActiveFirstOption={true}
          defaultValue={data[0].sessionId}
          style={{ width: "100%" }}
          placeholder="Select a session"
          optionFilterProp="children"
          onChange={value => onHandleSessionChange(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {options}
        </Select>
      )}
    </Widget>
  );
};

export default Sessions;
