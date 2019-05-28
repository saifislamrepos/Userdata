import React, { Component } from 'react';
import acccss from './accordion.scss';
class accordion extends React.Component {
    state = {
        open : false,
        show:false
      }
      toggelecontent = ()=> {
        let open = this.state.open;
        this.setState({
            open:!open
        });
        setTimeout(() => {   
        let show = this.state.show;
        this.setState({
            show:!show
        });
        }, 300);
      }
  render() {
    return (
        <div>
            <h3 className = "accordion-head" onClick={this.toggelecontent}>{this.props.heading}</h3>
            <div className={'box accordion-cont ' + (this.state.open ? 'show-cont ':'') +  (this.state.show ? '':'hide')}>
                {this.props.children}
            </div>
        </div>
    );
  }
  
}
export default accordion;