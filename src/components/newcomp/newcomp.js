import React ,{Component} from 'react' ;
import newcompcss from './newcomp.scss';
import axios from 'axios';
import Anchor from '../uicomp/anchor/anchor.js'
import Header from '../header/header.js'
import Text from '../uicomp/text/text.js'
class newcomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            category: '',
            file:null,
            error:false,
            success:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        const filename= this.state.name.split(' ').join('')+'-'+this.state.category;
        formData.append('photoname',filename);
        formData.append('name',this.state.name);
        formData.append('category',this.state.category);
        formData.append('userPhoto',this.state.file);
        axios.post('/createuser', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
        })
          .then( (response)=> {
            this.setState({
                error : false,
                success:true,
                name:'',
                category: '',
                file:null,
            });
            document.getElementById("user-form").reset();
          })
          .catch( (error) => {
            this.setState({
                error : error.response.data,
                success:false
            });
            console.log(error.response.data);
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value ,error:false,success:false});
    }
    onfileChange=(e)=> {
        this.setState({file:e.target.files[0]});
    }
    render() {
        const error = this.state.error;
        const success = this.state.success;
        let errorcomp;
        let successcomp;
        if(error) {
           errorcomp =<Text textclass="font-red text-left" message={error}/>
        }
        if(success) {
            successcomp = <Text textclass="font-green text-center" message="User successfully added"/>
         }
        const adata= {
            href : "/",
            message:"SHOW USER"
         }
        return (
            <div className="pl-15 pr-15">
                <Header message="ADD USER" anchor={adata}/>
                <form name="create" onSubmit={this.handleSubmit} className="i-b" id="user-form">
                    <label>
                        Photo:
                        <input type="file" name="userPhoto" className="ml-5" onChange={this.onfileChange}/>
                    </label>
                    <label className="mr-20">
                        Name:
                        <input type="text" name="name" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <label className="mr-26">
                        Category:
                        <input type="text" name="category" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                    {errorcomp}
                    {successcomp}

                </form>
            </div>
        );
    }
}
export default newcomp;
