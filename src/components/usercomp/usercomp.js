import React ,{Component} from 'react' ;
import usercompcss from './usercomp.scss';
import Imagecomp from '../uicomp/imagecomp/imagecomp.js'
import Text from '../uicomp/text/text.js'
import Button from '../uicomp/button/button.js'
import Mask from '../mask/mask.js'
class usercomp extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           update : false,
           name:this.props.userdata.name,
           category:this.props.userdata.category,
           file:null
       }
       this.formref = React.createRef();
    }
    deleteUser(user){
        return this.props.deleteuser(user)
    }
    updateuser(user) {
        this.setState({
            update : true
        });
    }
    moredetails(user) {
        alert("coming soon")

    }
    submitform() {
        event.preventDefault();
        const user = {
        }
        if(this.state.name != this.props.userdata.name) {
            user.name= this.state.name
        }
        if(this.state.category != this.props.userdata.category) {
            user.category= this.state.category
        }
        if(this.state.file != null) {
            user.userPhoto= this.state.file
        }
        this.setState({
            update : false
        });
        if(Object.keys(user).length) {
            return this.props.updateuser(this.props.userdata,user)
        }

    }
    cancelupdate(user) {
        this.setState({
            update : false,
            name:this.props.userdata.name,
            category:this.props.userdata.category,
            file:null
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value ,error:false,success:false});
    }
    onfileChange=(e)=> {
        this.setState({file:e.target.files[0]});
    }
    render() {
        const user = this.props.userdata;
        const isupdate = this.state.update;
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
        const cancelprop = {
            "classname":"primary-button ml-10 cancel",
            "text":"cancel"
        }
        const submitprop = {
            "classname":"primary-button ml-10 submit",
            "text":"submit"
        }
        let profilimage =  user.photo+'?v='+user.id;
        if(typeof user.photo == "undefined") {
            profilimage =  '/default-'+user.gender+'.png';
        } 
        const rendercomp =( 
            <div className="pr usercomp">
                <Imagecomp classname = "i-b mr-10 v-aligm-m" imgpath={profilimage}/>
                <Text message = {user.name} textclass="bold fs-12 i-b mr-10 camelcase"/>
                <Text message = {user.category} textclass="i-b bold fs-12 text-uppercase"/>
                <Button buttonprop={detailsprop} clickaction= {this.moredetails.bind(this,user)}/>
                {this.props.auth && <Button buttonprop={updateprop} clickaction= {this.updateuser.bind(this,user)}/>}
                {this.props.auth && <Button buttonprop={deleteprop} clickaction= {this.deleteUser.bind(this,user)}/>}
            </div>)
        const renderform = ( 
            <form className="pr usercomp" ref={this.formref}>
                <label className="cursor-pointer">
                    <Imagecomp classname = "i-b mr-10 v-aligm-m" imgpath={profilimage}/>
                    <input type="file" name="userPhoto" className="ml-5 photo-input" onChange={this.onfileChange}/>
                    <Mask/>
                </label>
                <input type="text" name="name" className="bold fs-12 i-b mr-10 camelcase" onChange={this.onChange} value ={this.state.name}/>
                <input type="text" name="category" className="i-b bold fs-12 text-uppercase" onChange={this.onChange} value ={this.state.category}/>
                <Button buttonprop={cancelprop} clickaction= {this.cancelupdate.bind(this,user)}/>
                <Button buttonprop={submitprop} clickaction= {this.submitform.bind(this,user)}/>
            </form>)
        return  isupdate ? renderform:rendercomp
    }
}
export default usercomp;
