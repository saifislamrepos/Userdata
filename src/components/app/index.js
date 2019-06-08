import { connect } from 'react-redux'
import app from './app.js'
import { getlist } from "../../store/actions/index";
const mapStateToProps = state => {
    return { auth: state.auth };
};
const App = connect(mapStateToProps,{getlist})(app);
export default App;