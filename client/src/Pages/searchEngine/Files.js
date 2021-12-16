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
import IPAndPort from './../IPAndPort';

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

class Files extends Component {
    state = {
        open: false,
        link: "",
    }
    handleOpen = (e) => {
        this.setState({
            open: true,
            link: e
        })
    };

    handleClose = (e) => {
        this.setState({
            open: false,
            link: e
        })
    };
    DateConvert = e => {
        console.log(e)
        return (new Date(e * 1000)).toString()
    }
    render() {
        const { classes } = this.props;
        console.log(this.props.data)
        return (
            <div style={{ padding: "2%" }}>
                <Typography variant="h4" color="primary" component="h2" gutterBottom >
                    {this.props.data.TITLE}
                </Typography>
                <Typography variant="body1" component="h2" gutterBottom>
                    {this.props.data.DESCRIPTION}
                </Typography>
                <br />
                <Grid container spacing={3} direction="row"
                    justify="center"
                    alignItems="center">
                    {
                        this.props.data.PATH.map((v, i) => (
                            <Grid item key={i}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={() => this.handleOpen(IPAndPort+"/" + v)}>                   <CardActionArea disabled>
                                        <iframe
                                            src={IPAndPort+"/" + v+"?controls=1&showinfo=1&rel=1&autoplay=0&loop=0&playlist=zFwL301vd4A&mute=0"} style={{ height: "200px", width: "100%" }} data-autoplay={false} data-keepplaying={false}/>
                                    </CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" noWrap>
                                                {v.substring(14)}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {this.DateConvert(this.props.data.Data)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => { window.open("http://www.gmail.com", "_blank") }}>
                                            Share
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => { window.open("http://www.google.com", "_blank") }}>
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                        ))
                    }
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <iframe allowfullscreen="allowfullscreen" allow="autoplay" src={this.state.link} style={{ height: "80%", width: "80%" }} />
                    </Fade>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles)(Files);
