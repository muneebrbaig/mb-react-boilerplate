import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Common from "./Common";
import Settings from "./Settings";
import Auth from "./auth.reducers";

import Media from "./media.reducers";

import Profile from "./profile.reducer";
import Dashboard from "./dashboard.reducers";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    profile: Profile,
    dashboard: Dashboard,

    media: Media,
  });

export default reducers;
