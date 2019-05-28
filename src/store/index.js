import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./reducers";
const middleware = [thunkMiddleware];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )
export default store;