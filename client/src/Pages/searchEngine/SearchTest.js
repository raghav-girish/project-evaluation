import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import DirectionsIcon from '@material-ui/icons/Directions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SpeechRecognition from 'react-speech-recognition'
import Button from '@material-ui/core/Button';
import { Grid, Typography, Tooltip } from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Image from './1.PNG';
import ImageTest from './ImageTest';
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import { withStyles } from '@material-ui/core/styles';
import FullScreenModel from './../FullScreenModel';
import NormaModel from './../NomralModel';
import Files from './Files';
import IPAndPort from './../IPAndPort';

import axios from 'axios';

const options = {
    autoStart: false
}

const styles = theme => ({
    root: {
        width: "100%",
        borderRadius: "25px",
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        marginLeft: theme.spacing(1),
        padding: "3%",
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },

});

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.searchVoiceAndStop = this.searchVoiceAndStop.bind(this);
        this.searchFromImage = this.searchFromImage.bind(this);
    }
    state = {
        search: "",
        result: [],
        open: false,
        opne1: false,
        resultToPass: [],
    }
    static getDerivedStateFromProps(props, state) {
        if (props.transcript) {
            return { search: props.transcript };
        }
        return { a: 1 }
    }

    async componentDidMount() {
        await this.setState({
            search: localStorage.getItem('search')
        })
        this.onClickHandler()
    }
    DateConvert = e => {
        console.log(e)
        return (new Date(e * 1000)).toString()
    }
    handleChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    clearAll = () => {
        this.props.resetTranscript();
        this.setState({
            search: ""
        })
    }
    async searchFromImage(e) {
        console.log('from here')
        console.log(e.trim())
        await this.setState({
            search: e.trim()
        })
        if (this.state.search != "") {

            this.onClickHandler()
        }
        else 
        {
            alert('Please Capture Again')
        }
    }

    handleClickOpen = (e) => {
        this.setState({
            open: true,
            resultToPass: this.state.result[e.currentTarget.id]
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };
    handleOpen1 = (e) => {
        this.setState({
            open1: true,
        })
    };

    handleClose1 = (e) => {
        this.setState({
            open1: false
        })
    };

    onClickHandler = () => {
        this.props.resetTranscript();
        this.props.stopListening();
        this.setState({
            result: []
        })
        localStorage.setItem('search', this.state.search)
        axios.post(IPAndPort + "/project/files/find", this.state)
            .then(res => {
                console.log(res.data);
                this.setState({
                    result: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })

    }
    async searchVoiceAndStop() {
        await this.setState({
            search: this.props.transcript
        })
        this.props.resetTranscript();
        this.props.stopListening();
        this.onClickHandler();
    }
    home = () => {
        this.props.resetTranscript();
        this.props.stopListening();
        localStorage.clear();
        this.props.history.push('/')
    }
    render() {
        const { classes } = this.props;
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props

        if (!browserSupportsSpeechRecognition) {
            return (<h1>Error</h1>)
        }
        //console.log(this.props.trnascript)
        return (
            <Paper style={{ padding: "2%" }} elevation={3}>
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={3}
                    style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1, borderBottom: "1px solid lightgrey", paddingBottom: "1%" }} >
                    {window.innerWidth > 420 ? (<Grid item sm={2}>
                        <img src={Image} alt="krce" height="80px" width="100px" />
                    </Grid>) : ""}
                    <Grid item sm={8}>
                        {/* <Paper className={classes.root} elevation={2}>
                            <IconButton className={classes.iconButton} onClick={this.home} aria-label="menu">
                                <HomeIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                name="search"
                                placeholder="Search By Keyword or Title"
                                value={this.state.search}
                                fullWidth
                                onChange={this.handleChange}
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={this.onClickHandler}>
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                <DirectionsIcon />
                            </IconButton>

                        </Paper> */}
                        <Paper
                            elevation={2}
                            className={classes.root}
                        >
                            <IconButton color="primary" aria-label="search" style={{ marginLeft: "15px" }}
                                onClick={this.home}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <InputBase
                                name="search"
                                placeholder="Search By Keyword or Title"
                                onChange={this.handleChange}
                                value={this.state.search}
                                fullWidth
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <span style={{ breakAfter: "always !important" }} />
                            <IconButton color="primary" aria-label="search" onClick={this.onClickHandler}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="search" onClick={this.clearAll}>
                                <ClearIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="directions"
                                onClick={this.handleOpen1}
                            >
                                <ImageSearchIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="search" onClick={startListening}>
                                <MicIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="directions" onClick={this.searchVoiceAndStop}>
                                <MicOffIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item sm={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.home}
                            style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}
                        >
                            <HomeIcon />
                        </Button>

                    </Grid>
                </Grid>
                <br />
                <br />
                {
                    this.state.result.length === 0 ? <Typography variant="h4" component="h2" >
                        No Data Found
                </Typography> : (<div>
                            {this.state.result.map((v, i) =>
                                (
                                    <div key={i}>
                                        <Button style={{ textTransform: 'none', padding: 0 }} onClick={this.handleClickOpen} id={i}>
                                            <Typography variant="h4" color="primary" component="h2" align="left">
                                                {v.TITLE}
                                            </Typography>
                                        </Button>
                                        <Typography variant="body1" component="h2" gutterBottom>
                                            {v.DESCRIPTION.substring(0, 250) + " ..."}
                                        </Typography>
                                        <Typography variant="body2" component="h2">
                                            <strong>Keywords: </strong> {v.HIGH + " " + v.MEDIUM + " " + v.LOW + " " + v.VERY_LOW}
                                        </Typography>
                                        <Typography variant="body2" component="h2">
                                            <strong>Uploded By: </strong> {v.FACULTY_FNAME + " " + v.FACULTY_LNAME + " (" + v.FACULTY_ID + ")"}
                                        </Typography>
                                        <Typography variant="body2" component="h2">
                                            <strong>Uploded On: </strong> {this.DateConvert(v.Data)}
                                        </Typography>
                                        <br />
                                    </div>
                                )
                            )}
                        </div>)
                }
                <FullScreenModel component={<Files data={this.state.resultToPass} />} open={this.state.open} handleClose={this.handleClose} title="Uploded Documents" />

                <NormaModel open={this.state.open1} handleClose={this.handleClose1} component={(<ImageTest search={this.searchFromImage} />)} />

            </Paper >
        )
    }
}

export default withStyles(styles)(SpeechRecognition(options)(Upload));

