import { connect } from 'react-redux'
import list from './list.js'
import { deleteuser } from "../../../store/actions/index";

const mapStateToProps = state => {
  return { config: state.config };
};
const List = connect(mapStateToProps,{deleteuser})(list);
export default List;