import React, { Component } from 'react';
import Anchor from '../uicomp/anchor/anchor.js'
class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message : 'USER DATA'
    };
   
  }

  handleClick  () {
    console.log(this)
  }
  render() {
    const message = this.props.message;
    const anchor = this.props.anchor;
    return (
      <header className="text-center component">
        <p className="fs-16 i-b bold">
          {message}
        </p>
        <Anchor href={this.props.anchor.href} message={this.props.anchor.message} class="blue pull-right mr-20 mt-15"/>
    </header>
    );
  }
  
}
export default header;