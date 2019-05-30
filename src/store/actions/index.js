import {
  ASSIGN_LIST
} from "../constants/action-types";
import axios from 'axios'
export function assignlist(payload) {
  return {
    type: ASSIGN_LIST,
    payload
  };
}
export function deleteuser(user) {
  return (dispatch) => {
    axios.post('/delete-user', user)
      .then((response) => {
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
        dispatch(assignlist(response.data))
      })
      .catch((error) => {
        return Object.assign({}, state, {
          error: error.response.data
        });
      });
  }
}

export function updateuser(user,newuser) {
  const data = {
    euser:user,
    newuser:newuser
  }
  const filename= data.euser.name.split(' ').join('')+'-'+data.euser.category;
  const formData = new FormData();
  formData.append('photoname',filename);
  formData.append('userPhoto',data.newuser.userPhoto);
  formData.append('name',data.newuser.name);
  formData.append('category',data.newuser.category);
  formData.append('euser_id',data.euser._id);
  formData.append('eusername',data.euser.name);
  return (dispatch) => {
    axios.post('/update-user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    })
    .then((response) => {
      dispatch(getlist())
    })
    .catch((error) => {

      console.log(error.response.data);
    });
 
  }
}