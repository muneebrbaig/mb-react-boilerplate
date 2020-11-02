import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from "url-search-params";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import asyncComponent from "util/asyncComponent";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "constants/ThemeSetting";

import { utils } from "@mb";
import { api } from "@mb/api";
import { setInitUrl } from "appRedux/actions/auth.actions";

import Home from "routes/home";
import Welcome from "routes/auth/Welcome";
import Continue from "routes/auth/Continue";
// import ForgotPassword from "routes/auth/ForgotPassword";
// import adminlogin from "../admin/31b80c99f1d265b3f83441bdff2abf85";



const App = () => {
  const dispatch = useDispatch();
  const { locale, navStyle, layoutType } = useSelector(
    ({ settings }) => settings
  );
  const { token, initURL } = useSelector(({ auth }) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  // useEffect(() => {
  //   document.body.classList.add('dark-theme');
  //     let link = document.createElement('link');
  //     link.type = 'text/css';
  //     link.rel = 'stylesheet';
  //     link.href = "/css/dark_theme.css";
  //     link.className = 'style_dark_theme';
  //     document.body.appendChild(link);
  // }, []);
  useEffect(() => {
    if (initURL === "") {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get("theme")));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get("nav-style")));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get("layout-type")));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [
    dispatch,
    initURL,
    layoutType,
    location.pathname,
    location.search,
    navStyle,
  ]);

  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  const setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };
  useEffect(() => {
    if (!utils.isEmpty(token)) {
      api.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.axios.defaults.headers.common["Authorization"];
      //history.push("/signin");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (utils.isEmpty(token)) {
        history.push("/home");
      } else if (initURL === "" || initURL === "/" || initURL.startsWith( "/continue")) {
        history.push("/home");
      } else {
        history.push(initURL);
      }
    }
  }, [token, initURL, location, history]);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          {/* <Route
            exact
            path="/admin/31b80c99f1d265b3f83441bdff2abf85/:token"
            component={adminlogin}
          /> */}
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/continue/:token" component={Continue} />
          <Route exact path="/welcome" component={Welcome} />

          {/* <Route exact path="/signin" component={SignIn} /> */}
          {/* <Route exact path="/ForgotPassword" component={ForgotPassword} /> */}

          <Route
            path={`${match.url}404`}
            component={asyncComponent(() => import("routes/errorPages/404"))}
          />import HomePage from './../../routes/home/index';


          {/* <Route exact path="/ChangePassword" component={ChangePassword} /> */}
          <Route
            path={`${match.url}`}
            token={token}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);
