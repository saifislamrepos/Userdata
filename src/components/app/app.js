import React, { Component } from 'react';
import Header from '../header/header.js'
import List from '../uicomp/list'
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
      return(
         <div className="pr-24">
            <Header message="USER DATA" anchor = {adata}/>
            <List/>
            {errorcomp}
         </div>
      );
   }
}
export default App;