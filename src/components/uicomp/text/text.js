import React ,{Component} from 'react' ;
import textcss from './text.scss';
class text extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const message = this.props.message;
        const textclass = this.props.textclass
        return (
            <p className={textclass}>
                {message}
            </p>
        );
    }
}
export default text;