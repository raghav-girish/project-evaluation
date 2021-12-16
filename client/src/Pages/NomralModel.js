import React, { Component } from "react";
import {
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid
} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: "140",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class NomralModel extends Component {
       
    render() {
        const { classes } = this.props;
        const comp = this.props.component;
        return (

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.props.open}
                onClose={this.props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    {comp}
                </Fade>
            </Modal>
        );
    }
}

export default withStyles(styles)(NomralModel);
