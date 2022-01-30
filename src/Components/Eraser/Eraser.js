import React from 'react';
import EraserSvg from '../../Assets/Icons/Eraser.svg';
import './Eraser.scss';

class Eraser extends React.Component {
    render() {
        console.log(this.props.className)
        return (
            <img src = {EraserSvg} className={this.props.className} onClick={this.props.onClick} />
        )
    }
}

export default Eraser;