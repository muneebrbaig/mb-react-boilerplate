import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import { THEME_TYPE_LITE } from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { menuList } from "./data.sidebar.content";

const SidebarContent = () => {
  let {/*navStyle,*/ themeType} = useSelector(({settings}) => settings);
  let {pathname} = useSelector(({common}) => common);
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {menuList.map((data) => (
              <Menu.Item key={data.key}>
                <Link to={data.linkTo}>
                  <i className={data.iconClass} />
                  <IntlMessages id={data.intlMessagesId} />
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
