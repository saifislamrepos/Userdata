import React ,{Component} from 'react' ;
import listcss from './list.scss';
import Imagecomp from '../imagecomp/imagecomp.js'
import Text from '../text/text.js'
import Button from '../button/button.js'
import User from '../../usercomp'
import axios from 'axios'
class list extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        const userlength = this.props.config.length;
        const listItems = this.props.config.map((user) =>
            <li key={user._id} className="mb-15 pb-10">
                <User userdata={user} auth={this.props.auth}/>

            </li>
        );
        return (
            <ul className="list">
                {listItems}
                {userlength == 0 && <p className ="font-red bold">No users found please add user</p>}
            </ul>
        );
    }
}
export default list;
