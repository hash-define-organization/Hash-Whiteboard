import React from 'react';
import './modal.css';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
function Modal({ handleClose, handleConfirm ,  show, children }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <><div className={showHideClassName}>
        <section className="modal-main">
            {children}
            <div className="titleCloseBtn">
               <div className='warning-container'>
                <WarningRoundedIcon className='war-icon'></WarningRoundedIcon>
                <h1 className='heading-popup'>Are you sure?</h1>
               </div>
                <p className='subheading-popup'>this action cannot be undo</p>
                
            </div>
            <div className="btn-container">
            <button className='btn btn-1' type='button'
                    onClick={handleConfirm}>
                    Yes
                </button>
                <button className='btn btn-2' type='button'
                    onClick={handleClose}>
                    No
                </button>
            </div>
        </section>
        </div></>
    );
}

export default Modal