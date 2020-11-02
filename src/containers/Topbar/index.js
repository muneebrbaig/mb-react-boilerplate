import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import UserInfo from "components/UserInfo";
import { toggleCollapsedSideNav } from "../../appRedux/actions/Setting";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";

const { Header } = Layout;

const Topbar = () => {
  const dispatch = useDispatch();

  const { width, navCollapsed, navStyle } = useSelector(
    ({ settings }) => settings
  );

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER ||
      ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
        width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn gx-text-white icon icon-menu"
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}
      <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
        <img alt="" src={require("assets/images/w-logo.png")} />
      </Link>

      <ul className="gx-header-notifications gx-ml-auto">
        {/* {width >= TAB_SIZE ? null : ( */}
          <>
            <li className="gx-user-nav">
              <UserInfo />
            </li>
          </>
        {/* )} */}
      </ul>
    </Header>
  );
};

export default Topbar;
