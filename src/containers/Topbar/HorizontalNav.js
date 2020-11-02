import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "../../constants/ThemeSetting";
import { menuList } from "./data.menu.content";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HorizontalNav = () => {

  const navStyle = useSelector(({settings}) => settings.navStyle);
  const {pathname} = useSelector(({common}) => common);

  const getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";
    }
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal"
      //className={getNavStyleSubMenuClass(navStyle)}

    >
      {/* <SubMenu
        className={getNavStyleSubMenuClass(navStyle)}
        key="main"
        title={<IntlMessages id="sidebar.main" />}
      > */}
        {menuList.map((data, index) => (
          <Menu.Item key={data.key} >
            <Link to={data.linkTo} className={`${data.key==selectedKeys?'gx-text-secondary':'gx-text-white'} gx-text-uppercase`}>
              {/* <i className={data.iconClass} /> */}
             <IntlMessages id={data.intlMessagesId} /> &nbsp; 
            </Link>
          </Menu.Item>
        ))}
        {/* <Menu.Item key="sample">
          <Link to="/sample">
            <i className="icon icon-widgets" />
            <IntlMessages id="sidebar.samplePage" />
          </Link>
        </Menu.Item> */}
      {/* </SubMenu> */}
    </Menu>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
