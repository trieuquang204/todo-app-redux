import { createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from 'redux-thunk';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const composedEnhancers = composeWithDevTools();

const store = createStore(rootReducer, composedEnhancers);

export default store;