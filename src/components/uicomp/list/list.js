import React ,{Component} from 'react' ;
import listcss from './list.scss';
import Imagecomp from '../imagecomp/imagecomp.js'
import Text from '../text/text.js'
import Button from '../button/button.js'
import axios from 'axios'
class list extends React.Component {
    constructor(props) {
        super(props); 
    }
    updateuser(user) {
        alert("coming soon")

    }
    moredetails(user) {
        alert("coming soon")

    }
    deleteUser(user){
      return this.props.deleteuser(user)
    }

    render() {
        const updateprop = {
            "classname":"primary-button ml-10",
            "text":"Update"
        }
        const deleteprop = {
            "classname":"primary-button ml-10",
            "text":"Delete"
        }
        const detailsprop = {
            "classname":"primary-button ml-10",
            "text":"Details"
        }
        const listItems = this.props.config.map((user) =>
            <li key={user._id} className="mb-15 pb-10">
                <Imagecomp classname = "i-b mr-10 v-aligm-m"imgpath={user.photo}/>
                <Text message = {user.name} textclass="bold fs-12 i-b mr-10 camelcase"/>
                <Text message = {user.category} textclass="i-b bold fs-12 text-uppercase"/>
                <Button buttonprop={detailsprop} clickaction= {this.moredetails.bind(this,user)}/>
                <Button buttonprop={updateprop} clickaction= {this.updateuser.bind(this,user)}/>
                <Button buttonprop={deleteprop} clickaction= {this.deleteUser.bind(this,user)}/>
            </li>
        );
        return (
            <ul className="list">{listItems}</ul>
        );
    }
}
export default list;
