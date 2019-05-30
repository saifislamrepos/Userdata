import { ADD_ARTICLE,GET_LIST,DELETE_USER,ASSIGN_LIST } from "../constants/action-types";
const initialState = {
  config: [],
  error:false
};
function rootReducer(state = initialState, action) {
  if(action.type == ASSIGN_LIST) {
    return Object.assign({}, state, {
      config: action.payload
    });
  }
  return state;
}
export default rootReducer;