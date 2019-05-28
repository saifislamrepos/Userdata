import React, { Component } from 'react';
import autosuggestcss from './autosuggest.scss';
class autosuggest extends React.Component {
    uilist = this.props.list
    state = {
        list : []
    };
    handleChange = (event) => {
        if(event.target.value == '') {
            this.setState({
                list:[]
            })
            return
        }
        
        let keys = Object.keys(this.uilist);
        let newlist = []
        for (let key in keys) {
            newlist =  newlist.concat(this.uilist[keys[key]].filter((elem) => {
                return elem.name.indexOf(event.target.value) == 0;  
            }))
        }
        this.setState({
            list:newlist
        })
    }
    selectcomp = (name) => {
        const scrollpos =  document.getElementsByClassName(name)[0].offsetTop;
        window.scrollTo(0,scrollpos);
    }
    render() {
        const format = '<div class = "grid"><div class = "col-1"></div></div>';
        const options = this.state.list.map((comp) =>
            <p key={comp.id} onClick= {this.selectcomp.bind(this,comp.name)}>
            {comp.name}
            </p>
        );
        return (
            <div className = "autosuggest">
                <span className= "heading">Search</span>
                <div className = "suggest">
                    <input type="text"  onChange={this.handleChange.bind(this)} placeholder = "Enter component name"/>
                    <div className = "suggestions">
                    {options}
                    </div>
                </div>
            </div>
        );
    }
  
}
export default autosuggest;