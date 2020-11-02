import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { submitMedia } from "appRedux/thunks";
import { Upload, Button, Spin, Card } from "antd";
import {
  UploadOutlined,
  CloudUploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const FileUpload = (props) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append(props.fieldName || "theFile", file);
    });
    setFileList([]);

    props.handleFileUpload(formData, props.entityId || 0);
  };

  if (!props.showImportUi) {
    return <></>;
  }

  const { uploading } = props;

  const uploadProps = {
    onRemove: (file) => {
      setFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return [...newFileList];
      });
    },
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    multiple: false,
    accept: props.accept,
    showUploadList: props.showUploadList,
  };

  return (
    <Spin spinning={uploading} tip="Uploading...">
      <Upload {...uploadProps}>
        <Button
          size="small"
          title={
            props.enableUpload ? "Select File" : props.helpTip || "Select File"
          }
          disabled={!props.enableUpload}
        >
          <UploadOutlined />
          {props.hideSelectFileMessage ? "" : "Select File"}
        </Button>
      </Upload>
      <Button
        title={"Upload..."}
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0 || !props.enableUpload}
        loading={uploading}
        size="small"
        loading={uploading}
        //style={{ marginTop: -10 }}
      >
        <CloudUploadOutlined />
        {props.hideSelectFileMessage
          ? ""
          : uploading
          ? "Uploading"
          : "Start Upload"}
      </Button>
    </Spin>
  );
};

const UploadCard = (props) => {
  const dispatch = useDispatch();
  const { mediaUploading } = useSelector(({ media }) => media);
  const onHandleFileUpload = (formData, entityId) => {
    if (props.forwardUpload) {
      props.handleFileUpload(formData, props.entityId || 0);
    } else {
      dispatch(submitMedia(entityId, formData));
    }
  };
  return (
    props.showImportUi && (
      <Card
        title={<h4>{props.title}</h4>}
        extra={
          props.handleCancelUpload && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.handleCancelUpload();
              }}
              style={
                mediaUploading
                  ? {
                      pointerEvents: "none",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              <CloseCircleOutlined />
            </a>
          )
        }
      >
        <FileUpload
          uploading={mediaUploading}
          enableUpload={true}
          showUploadList={true}
          {...props}
          handleFileUpload={onHandleFileUpload}
        ></FileUpload>
      </Card>
    )
  );
};

export { FileUpload, UploadCard };
