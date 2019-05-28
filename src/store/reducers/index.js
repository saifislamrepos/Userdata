import { ADD_ARTICLE,GET_LIST,DELETE_USER,ASSIGN_LIST } from "../constants/action-types";
const initialState = {
  articles:[],
  config: [],
  error:false
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if(action.type == ASSIGN_LIST) {
    console.log(action.payload);
    return Object.assign({}, state, {
      config: action.payload
    });
  }
  if(action.type == DELETE_USER) {
    axios.post('/deleteuser', action.payload)
    .then( (response)=> {
        console.log(response);
    })
    .catch( (error) => {
      
        console.log(error.response.data);
    });
    return Object.assign({}, state, {
      config: action.payload
    });
  }
  return state;
}
export default rootReducer;