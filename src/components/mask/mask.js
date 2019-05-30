import React ,{Component} from 'react' ;
import maskcss from './mask.scss';
class mask extends React.Component {
    constructor(props) {
       super(props);
    }
    handleclick () {
        return this.props.clickaction
    }
    render() {
        return (
            <div className="mask" >
            </div>
        );
    }
}
export default mask;
