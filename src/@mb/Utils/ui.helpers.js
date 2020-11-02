import React from "react";
import { Select } from "antd";
import { utils } from "..";
const Option = Select.Option;

export default {
  getDrowpdownOptions,
  openReportPdf
};


function getDrowpdownOptions(list, emptyOption, keyName="key", displayName="DisplayText"){
  const options = [];
  /*if (emptyOption !== undefined) {
      options.push(`<Option key="${emptyOption[keyName]}">${emptyOption[displayName]}</Option>`);
  }*/
  for (let i = 0; i < list.length; i++) {
      options.push(<Option key={list[i][keyName]} value={list[i][keyName]} >{list[i][displayName]}</Option>)
  }
  return options;
}

function openReportPdf(reportPdf, reportId) {
  // console.log("reportId: ", reportId);
  // console.log("reportPdf: ", reportPdf);

  //Create a Blob from the PDF Stream
  const file = new Blob([reportPdf], {
    type: "application/pdf"
  });
  if (reportId == null){
    reportId = utils.key() //Math.floor(Math.random()*1000000) //todo: replace this with utils.key()
  }
  const fileName = `report_${reportId}.pdf`;

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
