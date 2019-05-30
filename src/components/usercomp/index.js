import { connect } from 'react-redux'
import user from './usercomp.js'
import { deleteuser,updateuser } from "../../store/actions/index";

const usercomp = connect(null,{deleteuser,updateuser})(user);
export default usercomp;