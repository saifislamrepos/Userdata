import React, { Component } from 'react';
import Header from '../header/header.js'
import List from '../uicomp/list'
import Anchor from '../uicomp/anchor/anchor.js'
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
            {(this.props.auth) && <Anchor href = "#/signin" message="ADD USER" class="blue pull-left ml-20 mt-15"/>}
            <Header message="USER DATA" anchor = {sdata}/>
            <List auth= {this.props.auth}/>
            {errorcomp}
         </div>
      );
   }
}
export default App;