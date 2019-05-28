import React, { Component } from 'react';
class Laoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message : 'Loading.....'
    };
   
  }

  handleClick  () {
    console.log(this)
  }
  render() {
    const message = this.state.message;
    return (
      <div className="loader">
        <p>
          {message}
        </p>
      </div>
    );
  }
  
}
export default Laoder;