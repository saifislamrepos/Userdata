import React ,{Component} from 'react' ;
import errorcss from './error.scss';
class error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:this.props.message
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.message
        });
    }
    render() {
        const message = this.state.message
        return (
            <div>
                <div className="class font-red">
                {message}
                </div>
            </div>
        );
    }
}
export default error;
