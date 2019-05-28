import React ,{Component} from 'react' ;
import imagecompcss from './imagecomp.scss';
class imagecomp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const imgpath = '/profileImages/'+this.props.imgpath;
        const custclass = this.props.classname
        return (
            <div className={custclass + " imagecomp"}>
                <img src= {imgpath}/>
            </div>
        );
    }
}
export default imagecomp;
