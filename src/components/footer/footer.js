import React, { Component } from 'react';
class footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message : 'footer'
    };
   
  }
  handleClick  () {
    console.log(this)
  }
  render() {
    const message = this.state.message;
    return (
      <footer className="component">
        <p className="fs-12">
          {message}
        </p>
    </footer>
    );
  }
  
}
export default footer;