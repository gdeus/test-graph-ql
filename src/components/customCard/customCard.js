import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { green } from '@material-ui/core/colors';
import CustomModal from '../modal/customModal';
import useStyles from './styles';



export default function CustomCard(props) {
    const classes = useStyles();
    const createdAt = 'Criado em ' + props.repositories.createdAt;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <div>
            <Card className={classes.root}>
                <CardHeader action={
                    <div>
                        <IconButton onClick={(event) => handleOpen(handleOpen)}><InfoIcon style={{ color: green[500] }} /></IconButton>
                    </div>
                }
                    title={props.repositories.name}
                    subheader={createdAt}
                />
                {open ? <CustomModal open={open} handleClose={handleClose} name={props.repositories.name} id={props.id}/> : null}
            </Card>
            
        </div>
    );
}