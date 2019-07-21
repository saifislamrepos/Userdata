import React, { Component } from 'react';
import Header from '../header/header.js'
import List from '../uicomp/list'
import Anchor from '../uicomp/anchor/anchor.js'
import Text from '../uicomp/text/text.js'
import scss from './app.scss'
class App extends Component{
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      this.props.getlist();
   }
   render(){
      let errorcomp;
      const adata= {
         href : "#/createcomponent",
         message:"ADD USER"
      }
      const sdata= {
         href : "#/signin",
         message:"SIGN IN"
      }
      if(this.props.auth) {
         sdata.href = "/logout";
         sdata.message = "LOGOUT"
      }
      return(
         <div className="pr-24">
            {(this.props.auth) && <Anchor href = "#/createcomponent" message="ADD USER" class="blue pull-left ml-20 mt-15"/>}
            {(this.props.auth) && <Text textclass = "pull-right mt-20 uprcse" message = {this.props.username}/>}
            <Header message="USER DATA" anchor = {sdata}/>
            <List auth= {this.props.auth}/>
            {errorcomp}
         </div>
      );
   }
}
export default App;