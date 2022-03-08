import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import themeAction from '../../Actions/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import MoonIcon from '@mui/icons-material/NightsStay';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme() {
        this.props.themeAction()
    }

    render() {
        return ( 
            <div className = {`header`}>
                <div className="header__left">
                    <div className = "header__title">
                        WHITEBOARD
                    </div>
                </div>
                {/* <div className="header__right">
                    {
                        this.props.theme === 'light' ? 
                        <MoonIcon className="icon themeIcon moonIcon" onClick={this.changeTheme} /> : 
                        <LightModeIcon className="icon themeIcon" onClick={this.changeTheme} />
                    }
                </div> */}
            </div> 
        );
    }
}

function mapStateToProps(state, ownProps) {
	return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps, {themeAction})(Header);