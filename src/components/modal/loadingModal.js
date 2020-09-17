import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from './styles';

export default function LoadingModal(props){
    const classes = useStyles();
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
                <Fade in={props.open}>
                    <CircularProgress/>
                </Fade>
            </Modal>
    )
}