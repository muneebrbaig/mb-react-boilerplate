import React, { useState } from "react";
import Iframe from "react-iframe";
import { utils } from "@mb";
import { Modal } from "antd";

const ContentModal = (props) => {
  const { show, url, onHandleWatched, title, imageOnly=false } = props;
  const [previewVisible, setPreviewVisible] = useState(show);
  console.log(show, previewVisible);
  const handleToggle = () => {
    setPreviewVisible(!previewVisible);
    onHandleWatched(props);
  };
  if (utils.isEmpty(url)) return <></>;
  return (
    <div>
      <div>
        <Modal
          title={title || "Welcome to mymo"}
          visible={show}
          footer={null}
          centered
          destroyOnClose
          maskClosable={false}
          width="90%"
          bodyStyle={{ padding: "2px 0" }}
          onCancel={() => handleToggle()}
        >
          {imageOnly ? (
            <img src={url} />
          ) : (
            <Iframe
              url={url}
              allowtransparency="true"
              frameborder="0"
              scrolling="no"
              width="100%"
              styles={{ maxHeight: "700px" }}
              // height="700px"
              // width="470px"
              // height="402px"
              allowFullScreen={true}
              display="initial"
              position="relative"
            ></Iframe>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ContentModal;
