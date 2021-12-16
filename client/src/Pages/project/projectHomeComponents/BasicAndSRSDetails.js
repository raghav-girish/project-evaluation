import React, { Component } from "react";
import {
    Toolbar,   
    Typography,
    Button,
    Grid,
    Fade,
    Paper,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import DoneIcon from "@material-ui/icons/Done";
import SRSForm from "./../adminSrsPage";
import BasicForm from "./../adminBasicPage";
import "react-sweet-progress/lib/style.css";
import FullScreenModel from './../../FullScreenModel';
import IPAndPort from './../../IPAndPort';
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import axios from "axios";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: "1%"
    },
    paper: {
        padding: theme.spacing(3, 2),
        marginRight: "1%",
        marginLeft: "1%"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    card: {
        maxWidth: 345,
        marginLeft: "1%"
    },
    tick: {
        color: "#4CAF50"
    },
    tick2: {
        color: "red"
    }
});



class adminProjectHomePage extends Component {
    state = {
        icon6: false,
        icon7: false,
        open1: false,
        open2: false,
    };

    handleClickOpenBasic = () => {
        this.setState({
            open1: true
        });
    };

    handleCloseBasic = () => {
        this.setState({
            open1: false
        });
        this.componentDidMount();
    };

    handleClickOpenSRS = () => {
        this.setState({
            open2: true
        });
    };

    handleCloseSRS = () => {
        this.setState({
            open2: false
        });
        this.componentDidMount();
    };


    componentDidMount() {
        var a = localStorage.getItem("project_id");
        var data = {
            _id: parseInt(a),
        };

        axios
            .post(IPAndPort+"/project/basicForm/getBasicFormDetails", data)
            .then(res => {
                console.log(res.data);
                if (res.data.length !== 0) {
                    this.setState({
                        icon6: true
                    });
                }
            })
            .catch(err => console.log(err));

        axios
            .post(IPAndPort+"/project/srsForm/getSRSDetails", data)
            .then(res => {
                console.log(res.data);
                if (res.data.length !== 0) {
                    this.setState({
                        icon7: true
                    });
                }

            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.icon2);
        const { classes } = this.props;
        return (

            <Paper
                style={{
                    width: "90%",
                    marginLeft: "5%",
                    marginRight: "5%"
                }}
            >
                <Toolbar
                    style={{ textAlign: "center", backgroundColor: "#3f51b5 " }}
                >
                    <Typography
                        style={{
                            fontSize: 20,
                            color: "white"
                        }}
                    >
                        Basic & SRS Status
                  </Typography>
                </Toolbar>
                <div style={{ padding: 15 }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        item
                    >
                        <h3>Basic Form</h3>{" "}
                        <Fade in={true}>
                            {this.state.icon6 ? (
                                <DoneIcon
                                    className={classes.tick}
                                    style={{ fontSize: 25, marginLeft: 10 }}
                                />
                            ) : (
                                    <CloseIcon
                                        className={classes.tick2}
                                        style={{ fontSize: 25, marginLeft: 10 }}
                                    />
                                )}
                        </Fade>
                    </Grid>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={this.handleClickOpenBasic}
                    >
                        Open Basic Form
                  </Button>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        item
                    >
                        <h3>SRS Form</h3>{" "}
                        <Fade in={true}>
                            {this.state.icon7 ? (
                                <DoneIcon
                                    className={classes.tick}
                                    style={{ fontSize: 25, marginLeft: 10 }}
                                />
                            ) : (
                                    <CloseIcon
                                        className={classes.tick2}
                                        style={{ fontSize: 25, marginLeft: 10 }}
                                    />
                                )}
                        </Fade>
                    </Grid>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={this.handleClickOpenSRS}
                    >
                        Open SRS Form
                  </Button>
                </div>

                <FullScreenModel component={<BasicForm user={this.props.user} />} open={this.state.open1} handleClose={this.handleCloseBasic} title="Basic Form" />

                <FullScreenModel component={<SRSForm user={this.props.user} />} open={this.state.open2} handleClose={this.handleCloseSRS} title="Software Requirements Specification Form" />

               
            </Paper>

        );
    }
}

export default withSnackbar(withStyles(styles)(adminProjectHomePage));
