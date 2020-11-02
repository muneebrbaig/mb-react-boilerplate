import React, { useState } from "react";
import { Button, Dropdown, Layout, Menu, message, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
import UserInfo from "components/UserInfo";
import HorizontalNav from "../HorizontalNav";
import { Link } from "react-router-dom";
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

const InsideHeader = () => {
  const dispatch = useDispatch();

  // const [searchText, setSearchText] = useState('');
  //const locale = useSelector(({ settings }) => settings.locale);
 const {navCollapsed} = useSelector(({common}) => common);
  // const languageMenu = () => (
  //   <CustomScrollbars className="gx-popover-lang-scroll">
  //     <ul className="gx-sub-popover">
  //       {languageData.map(language =>
  //         <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
  //           dispatch(switchLanguage(language))
  //         }>
  //           <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
  //           <span className="gx-language-text">{language.name}</span>
  //         </li>
  //       )}
  //     </ul>
  //   </CustomScrollbars>);

  return (
    <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
      <div className="gx-header-horizontal-top">
        <div className="gx-container">
          <div className="gx-header-horizontal-top-flex">
            <div className="gx-header-horizontal-top-left">
              {/* <i className="icon icon-alert gx-mr-3" /> */}
              <p className="gx-mb-0 gx-text-truncate">
                <Link
                  to="/"
                  className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
                >
                  {/* <img alt="" src={require("assets/images/logo.png")} /> */}
                  <img
                    alt="THE BENCHMARK"
                    src={require("assets/images/logo-s.png")}
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Header className="gx-header-horizontal-main">
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  dispatch(toggleCollapsedSideNav(!navCollapsed));
                }}
              />
            </div>
            <Link
              to="/"
              className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
            >
              <img alt="" src={require("assets/images/w-logo.png")} />
            </Link>
            {/* <Link
              to="/"
              className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
            >
              <img
                alt="THE BENCHMARK"
                src={require("assets/images/logo-s.png")}
              />
            </Link> */}

            <div className=" gx-d-none gx-d-lg-block">
              <HorizontalNav />
            </div>
            <ul className="gx-header-notifications gx-ml-auto">
              {/* <li className="gx-notify gx-notify-search">
                <Popover overlayClassName="gx-popover-horizantal"
                         placement="bottomRight" content={
                  <div className="gx-d-flex"><Dropdown overlay={menu}>
                    <Button>
                      Category <DownOutlined/>
                    </Button>
                  </Dropdown>
                    <SearchBox styleName="gx-popover-search-bar"
                               placeholder="Search in app..."
                               onChange={updateSearchChatUser}
                               value={searchText}/></div>
                } trigger="click">

                  <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>

                </Popover>
              </li>

              <li className="gx-notify">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                         trigger="click">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                </Popover>
              </li>

              <li className="gx-msg">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={<MailNotification/>} trigger="click">
                <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new"/>
                <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                </span>
                </Popover>
              </li>
              <li className="gx-language">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                </Popover>
              </li> */}
              <li className="gx-user-nav">
                <UserInfo />
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

// const mapStateToProps = ({settings}) => {
//   const {locale, navCollapsed} = settings;
//   return {locale, navCollapsed}
// };
// export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(InsideHeader);
export default InsideHeader;
