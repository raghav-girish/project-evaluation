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
import ReviewForm from "./../adminReviewPageHome";
import { Progress } from "react-sweet-progress";
import IPAndPort from './../../IPAndPort';
import "react-sweet-progress/lib/style.css";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FullScreenModel from './../../FullScreenModel';

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


class ReviewDetails extends Component {
    state = {        
        icon1: false,
        icon2: false,
        icon3: false,
        icon4: false,
        icon5: false,
        open: false,
        overallProgress:0
    };


    handleClickOpenReview = () => {
        this.setState({
            open: true
        });
    };

    handleCloseReview = () => {
        this.setState({
            open: false
        });
        this.componentDidMount();
    };



    componentDidMount() {
        var a = localStorage.getItem("project_id");
        var data = {
            _id: parseInt(a)
        };

        axios
            .post(IPAndPort+"/project/review/getAllReview", data)
            .then(res => {
                console.log(res.data);
                if (res.data[0].REVIEW1.R_DATE !== "") {
                    this.setState({
                        icon1: true
                    });
                }
                if (res.data[0].REVIEW2.R_DATE !== "") {
                    this.setState({
                        icon2: true
                    });
                }
                if (res.data[0].REVIEW3.R_DATE !== "") {
                    this.setState({
                        icon3: true
                    });
                }
                if (res.data[0].REVIEW4.R_DATE !== "") {
                    this.setState({
                        icon4: true
                    });
                }
                if (res.data[0].REVIEW5.R_DATE !== "") {
                    this.setState({
                        icon5: true
                    });
                }   
                this.setState({
                    overallProgress:res.data[0].OVERALL_PROGRESS
                })           
            });
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
                        Review Details
                  </Typography>
                </Toolbar>
                <div
                    style={{ width: "80%", marginLeft: "auto", marginTop: 20 }}
                >
                    <Grid container spacing={5} style={{ width: "100%" }}>
                        <Grid                            
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            item
                        >
                            {this.state.overallProgress < 35 ? (
                                <Progress
                                    theme={{
                                        low: {
                                            color: "red"
                                        }
                                    }}
                                    type="circle"
                                    percent={this.state.overallProgress}
                                    status="low"
                                />
                            ) : this.state.overallProgress > 75 ? (
                                <Progress
                                    theme={{
                                        done: {
                                            color: "#4CAF50"
                                        }
                                    }}
                                    type="circle"
                                    percent={this.state.overallProgress}
                                    status="done"
                                />
                            ) : (
                                        <Progress
                                            theme={{
                                                active: {
                                                    color: "blue"
                                                }
                                            }}
                                            type="circle"
                                            percent={this.state.overallProgress}
                                            status="active"
                                        />
                                    )}
                        </Grid>
                        <Grid
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            item
                        >
                            <div style={{ textAlign: "center" }}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    item
                                >
                                    <Typography style={{ fontSize: 18 }}>
                                        Review 1{" "}
                                    </Typography>{" "}
                                    <Fade in={true}>
                                        {this.state.icon1 ? (
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
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    item
                                >
                                    <Typography style={{ fontSize: 18 }}>
                                        Review 2{" "}
                                    </Typography>{" "}
                                    <Fade in={true}>
                                        {this.state.icon2 ? (
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
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    item
                                >
                                    <Typography style={{ fontSize: 18 }}>
                                        Review 3{" "}
                                    </Typography>
                                    <Fade in={true}>
                                        {this.state.icon3 ? (
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
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    item
                                >
                                    <Typography style={{ fontSize: 18 }}>
                                        Review 4{" "}
                                    </Typography>{" "}
                                    <Fade in={true}>
                                        {this.state.icon4 ? (
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
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    item
                                >
                                    <Typography style={{ fontSize: 18 }}>
                                        Review 5{" "}
                                    </Typography>{" "}
                                    <Fade in={true}>
                                        {this.state.icon5 ? (
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
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <Button
                    style={{
                        width: "50%",
                        marginLeft: "25%",
                        marginTop: 20,
                        marginBottom: 20
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpenReview}
                >
                    Open Review
                </Button>

                <FullScreenModel component={<ReviewForm user={this.props.user}/>} open={this.state.open} handleClose={this.handleCloseReview} title="Review Home Page" />

                
            </Paper>



           


        );
    }
}

export default withSnackbar(withStyles(styles)(ReviewDetails));
