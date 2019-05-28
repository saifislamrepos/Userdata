import {
  ADD_ARTICLE,
  GET_LIST,
  DELETE_USER,
  ASSIGN_LIST
} from "../constants/action-types";
import axios from 'axios'
export function addArticle(payload) {
  return {
    type: ADD_ARTICLE,
    payload
  };
}
export function assignlist(payload) {
  return {
    type: ASSIGN_LIST,
    payload
  };
}
export function deleteuser(user) {
  return (dispatch) => {
    console.log(user)
    axios.post('/delete-user', user)
      .then((response) => {
        console.log('sasas')
        dispatch(getlist())
      })
      .catch((error) => {

        console.log(error.response.data);
      });
  }
}
export function getlist() {
  return (dispatch) => {
    axios.get('/getlist')
      .then((response) => {
        // handle success
        console.log()
        dispatch(assignlist(response.data))
      })
      .catch((error) => {
        return Object.assign({}, state, {
          error: error.response.data
        });
      });
  }
}