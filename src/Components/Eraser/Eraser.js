import { ReactComponent as EraserSvg } from '../../Assets/Icons/Eraser.svg';
import * as React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@mui/material';

const SvgIcon = styled(MuiSvgIcon, {
    name: 'Eraser',
    shouldForwardProp: (prop) => prop !== 'fill',
})(() => ({
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2.25px',
}));

SvgIcon.defaultProps = {
    viewBox: '0 0 24 24',
    focusable: 'false',
    'aria-hidden': 'true',
};

const Eraser = (props) => {
    return (
        <SvgIcon {...props}>
            <EraserSvg />
        </SvgIcon>
    );
};

export default Eraser;
