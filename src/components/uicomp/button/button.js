import React ,{Component} from 'react' ;
import buttoncss from './button.scss';
class button extends React.Component {
    constructor(props) {
       super(props);
       this.buttonclick = this.buttonclick.bind(this);
    }
    buttonclick (){
        return this.props.clickaction()
    }
    render() {
        const custclass = this.props.buttonprop.classname
        const text = this.props.buttonprop.text
        return (
            <button className={custclass} onClick={this.buttonclick}>
                {text}
            </button>
        );
    }
}
export default button;
