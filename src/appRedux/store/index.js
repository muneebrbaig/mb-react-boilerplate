import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
 import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import thunk from "redux-thunk";

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resetEnhancer = rootReducer => (state, action) => {
  if (action.type !== 'RESET_ALL') return rootReducer(state, action);

  const newState = rootReducer(undefined, {});
  newState.router = state.router;
  return newState;
};

export default function configureStore(initialState) {
  const store = createStore(
   // reducers(history), // reducers,
   resetEnhancer(reducers(history)),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export { history };
