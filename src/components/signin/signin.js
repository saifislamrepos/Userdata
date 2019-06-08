import React ,{Component} from 'react' ;
import axios from 'axios';
import Header from '../header/header.js'
class signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(event){
        axios.get('/verify')
          .then( (response)=> {
            window.location="/"
          })
          .catch( (error) => {
            console.log(error.response.data);
        });
    }
    handleSubmit(event){
        event.preventDefault();
        let data = {
            password:this.state.password,
            username:this.state.username
        }
        axios.post('/signIn', data )
          .then( (response)=> {

            document.getElementById("user-form").reset();
            window.location="/"
          })
          .catch( (error) => {
            console.log(error.response.data);
            document.getElementById("user-form").reset();
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value ,error:false,success:false});
    }
    render() {
        const sdata= {
            href : "/",
            message:"SHOW USERS"
         }
        return (
            <div className="pl-15 pr-15">
                <Header message="LOGIN" anchor = {sdata}/>
                <form name="create" className="i-b" id="user-form" onSubmit={this.handleSubmit}>
                    <label className="mr-26">
                        Username:
                        <input type="text" name="username" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <label className="mr-20">
                        Uassword:
                        <input type="password" name="password" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default signin;
