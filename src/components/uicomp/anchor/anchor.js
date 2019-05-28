import React ,{Component} from 'react' ;
import anchorcss from './anchor.scss';
class anchor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const message = this.props.message;
        const href = this.props.href;
        const anchorclass = this.props.class;
        return (
                <a className={anchorclass + ' anchor'} href={href}>{message}</a>
        );
    }
}
export default anchor;
