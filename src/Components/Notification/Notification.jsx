import React from 'react';
import './Notification.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotification: true
        }
    }

    toggleNotification = ()=>{
        this.setState(prevState=> ({showNotification: !prevState.showNotification}));
    }

    render() {
        
        console.log(this.props.shortenUrl)
        return (
            <div className='notification'>
                <div className='notification__toggle'>
                    <ArrowForwardIosIcon className = {`notification__toggle--icon ${this.state.showNotification ? "noti__toggle--activeIcon" : ""}`} onClick = {this.toggleNotification}/>
                </div>
                <div className={`notification__content ${this.state.showNotification ? "noti__content--active" : ""}`}>
                    <div className='noti__data'>{this.props.data}</div>
                    <a href = {this.props.shortenUrl}>{this.props.shortenUrl}</a>
                </div>
            </div>
        )

    }

}

export default Notification;