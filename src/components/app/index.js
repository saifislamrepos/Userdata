import { connect } from 'react-redux'
import app from './app.js'
import { getlist } from "../../store/actions/index";
const App = connect(null,{getlist})(app);
export default App;