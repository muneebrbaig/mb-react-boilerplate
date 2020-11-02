import React, { useState } from "react";
import { Input, Button, Popover, Typography, Collapse } from "antd";
import { lng, utils } from "@mb";
import { SaveOutlined, EditOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import Widget from "components/Widget";
import ContentModal from "../ContentModal";
const { Paragraph } = Typography;
const { Panel } = Collapse;
export {
  ContentType,
  ChoiceOption,
  ParagraphEx,
  EditableTextInput,
  LanguageSelectMenu,
  DirectionSwitchButton,
  QuestionMediaItem,
};

const ContentType = {
  isCorrect: "IsCorrect",
  text: "Text",
  direction: "Direction",
  language: "Language",
};

export const ChoiceType = {
  SingleSelection: 3,
  MultipleSelection: 4,
};

const ChoiceOption = ({
  index,
  isCorrect = false,
  allowEdits = true,
  choiceType,
  onChangeChoice,
}) => {
  return (
    <span
      className={`gx-border-2 gx-size-30 ${
        choiceType === ChoiceType.SingleSelection
          ? " gx-rounded-circle "
          : " gx-rounded-square "
      }   gx-d-block gx-text-center ${
        isCorrect
          ? " gx-text-green gx-border-green "
          : " gx-text-muted gx-border-grey "
      } ${allowEdits && "gx-pointer"} `}
      onClick={(e) => {
        allowEdits &&
          onChangeChoice(
            index,
            choiceType === ChoiceType.SingleSelection
              ? true
              : isCorrect == false
          );
      }}
    >
      <i
        className={
          isCorrect
            ? `icon icon-${
                choiceType === ChoiceType.SingleSelection ? "circle" : "check"
              } `
            : " "
        }
      />
    </span>
  );
};
const ParagraphEx = ({
  index = 0,
  text,
  allowEdits,
  language = lng.Language.English,
  direction = lng.Direction.LeftToRight,
  onChange,
  multiline = false,
  type = "text",
  keyName = ContentType.text,
  showText = true,
  editIcon = <EditOutlined style={{ fontSize: "16px" }} />,
}) => {
  const handleChange = (str) => {
    onChange(index, str, keyName);
  };
  return (
    <Paragraph
      className={`${lng.getLangClass(language)}`}
      dir={direction}
      editable={allowEdits && { onChange: handleChange }}
    >
      {text}
    </Paragraph>
  );
};
const EditableTextInput = ({
  index = 0,
  text,
  allowEdits,
  language = lng.Language.English,
  direction = lng.Direction.LeftToRight,
  onChange,
  multiline = false,
  type = "text",
  keyName = ContentType.text,
  showText = true,
  editIcon = <EditOutlined style={{ fontSize: "16px" }} />,
}) => {
  const [myText, setMyText] = useState(text);
  const [enableMyTextEdit, setMyTextEdit] = useState(false);

  return enableMyTextEdit ? (
    <div
      className={`gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap 
    ${lng.getLangClass(language)}`}
    >
      <div className="gx-col" dir={direction}>
        {multiline ? (
          <TextArea
            width="100%"
            autosize={{ minRows: 5, maxRows: 10 }}
            className="gx-task-title"
            id="displayText"
            name="displayText"
            placeholder="Your Response"
            onChange={(e) => setMyText(e.target.value)}
            defaultValue={myText}
            required
          />
        ) : (
          <Input
            className="gx-task-title"
            placeholder="Your Response"
            onChange={(e) => {
              setMyText(e.target.value);
            }}
            required
            defaultValue={myText}
            type={type}
          />
        )}
      </div>

      <span
        className={`gx-d-block gx-size-40 gx-text-center ${allowEdits &&
          "gx-pointer"}`}
        onClick={() => {
          setMyTextEdit(false);
          allowEdits && onChange(index, myText, keyName);
        }}
      >
        <SaveOutlined style={{ fontSize: "16px" }} />
      </span>
    </div>
  ) : (
    <span
      className={`gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap 
    ${lng.getLangClass(language)}`}
    >
      {showText && (
        <span className="gx-task-title gx-col" dir={direction}>
          {myText}
        </span>
      )}
      {allowEdits && (
        <span
          className={`gx-d-block gx-size-40 gx-text-center ${allowEdits &&
            "gx-pointer"}`}
          onClick={() => setMyTextEdit(true)}
        >
          {editIcon}
        </span>
      )}
    </span>
  );
};

const LanguageSelectMenu = ({
  index = 0,
  language = lng.Language.English,
  onChangeChoiceInfo,
  showName = false,
}) => {
  const [langVisible, setLangVisible] = useState(false);
  const locale = lng.getLanguageData(language);

  const onChageLanguage = (locale) => {
    setLangVisible(langVisible == false);
    onChangeChoiceInfo(index, locale, ContentType.language);
  };
  const languageMenu = () => {
    const languageData = lng.getLanguageData();

    return (
      <div className="gx-popover-lang-scroll">
        <ul className="gx-sub-popover">
          {languageData.map((language) => (
            <li
              className="gx-media gx-pointer"
              key={JSON.stringify(language)}
              onClick={(e) => onChageLanguage(language.locale)}
            >
              <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
              <span className="gx-language-text">{language.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={languageMenu()}
      trigger="click"
      visible={langVisible}
      onVisibleChange={setLangVisible}
    >
      <span className="gx-pointer gx-flex-row gx-align-items-center">
        <i className={`flag flag-24 flag-${locale.icon}`} />
        {showName && (
          <span className="gx-pl-2 gx-language-name">{locale.name}</span>
        )}
        <i className="icon icon-chevron-down gx-pl-2" />
      </span>
    </Popover>
  );
};

const DirectionSwitchButton = ({
  index = 0,
  direction = lng.Direction.LeftToRight,
  onChangeChoiceInfo,
}) => (
  <Button
    className="gx-btn-sm gx-mb-0"
    type={direction === lng.Direction.LeftToRight ? "default" : "primary"}
    onClick={() =>
      onChangeChoiceInfo(
        index,
        direction === lng.Direction.RightToLeft
          ? lng.Direction.LeftToRight
          : lng.Direction.RightToLeft,
        ContentType.direction
      )
    }
    title="Text direction"
  >
    {direction === lng.Direction.RightToLeft
      ? "Right to Left"
      : "Left to Right"}
  </Button>
);

const QuestionMediaItem = ({ mediaInfo, uploadedMediaInfo, extra }) => {
  const [handlePreview, setHandlePreview] = useState({
    show: false,
    url: "",
  });
  let imgSrc = "";

  const onToggle = () => {
    setHandlePreview((previousState) => ({
      show: !previousState.show,
      url: imgSrc,
      imageOnly:true
    }));
  };
  if (mediaInfo && (mediaInfo.ContentLink || mediaInfo.contentLink)) {
    imgSrc = mediaInfo.ContentLink || mediaInfo.contentLink;
  }
  if (uploadedMediaInfo && uploadedMediaInfo.url) {
    imgSrc = uploadedMediaInfo.url;
  }
  if (utils.isEmpty(imgSrc)) return <></>;

  return (
    <>
      <Widget styleName="gx-card-full gx-text-center" extra={extra}>
        <div className="gx-gallery-item" onClick={() => onToggle()}>
          <img
            className="gx-img-fluid"
            style={{ maxHeight: 150, maxWidth:150 }}
            src={imgSrc}
            alt="&nbsp;"
          />
        </div>
      </Widget>
      {/* <Collapse accordion defaultActiveKey={["1"]}>
        <Panel header="Media" key="1">
          <Widget styleName="gx-card-full gx-text-center" extra={extra}>
            <div className="gx-mt-xxl-3">
              <div
                className="gx-gallery-item"
                onClick={onToggle}
              >
                <img
                  className="gx-img-fluid gx-w-100"
                  alt="&nbsp;"
                  src={imgSrc}
                />
              </div>
            </div>
          </Widget>
        </Panel>
      </Collapse> */}
      <ContentModal
        {...handlePreview}
        title="Question"
        onHandleWatched={onToggle}
      />
    </>
  );
};
