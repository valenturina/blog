import React from 'react';
import {Button, Box, Paper, Dialog, DialogActions, DialogTitle} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';

const ModalWindow = ({modalOpen, handleCloseModal, handleDeleteArticle}) => {


    return (
        <Dialog
            open={modalOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id='alert-dialog-title'>
                <ErrorIcon style={{color: '#FAAD14', marginRight: '5px'}}/>Вы действительно хотите удалить статью?
            </DialogTitle>
            <DialogActions>
                <Button variant='outlined' onClick={handleCloseModal}>No</Button>
                <Button variant='contained' onClick={handleDeleteArticle}>Yes</Button>
            </DialogActions>

        </Dialog>
    )
}

export default ModalWindow