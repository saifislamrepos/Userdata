import { ADD_ARTICLE,GET_LIST,DELETE_USER,ASSIGN_LIST } from "../constants/action-types";
const initialState = {
  config: [],
  auth:false,
  error:false
};
function rootReducer(state = initialState, action) {
  if(action.type == ASSIGN_LIST) {
    return Object.assign({}, state, {
      config: action.payload.users,
      auth:action.payload.auth
    });
  }
  return state;
}
export default rootReducer;