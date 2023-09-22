"use client";

import React, { useState } from 'react';
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField, Typography } from '@mui/material';

type Props = {
    onOK: (action_name: string|null) => void;
    open: boolean;
}

const DialogueSaisieAction = (props: Props) => {


    const [name, setName] = useState<string>("coucou");

    const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        props.onOK(name);
    }

    
    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        props.onOK(null);
    }

    const changeName: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const Dia = <Dialog
        open={props.open}
        onClose={props.onOK}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
            <DialogContentText
                id="scroll-dialog-description"

                tabIndex={-1}
            >
                <Typography variant='body2'>Indiquer le nom de l'action à créer</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nom action"
                    type="text"
                    fullWidth
                    value={name}
                    variant="standard"
                    onChange={changeName}
                />
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleCancel}
                    variant='contained'
                    color='primary'
                    className='bg-blue-500 text-white font-bold'
                >Annuler</Button>
                <Button onClick={handleClose}
                    variant='contained'
                    color='primary'
                    className='bg-blue-700 text-white font-bold'
                >Créer</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>


    return (
        (props.open ?
            Dia : null)
    )
}

export default DialogueSaisieAction