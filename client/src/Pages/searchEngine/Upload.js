import React from 'react';
import { Card, TextField, Grid, Toolbar, Typography, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { withSnackbar } from "notistack";
import IPAndPort from './../IPAndPort';
import axios from 'axios';

const styles = theme => ({
    root: {
        width: "70%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "2%"
    },
    form: {
        padding: "3%",
        '& > *': {
            marginBottom: "2%"
        },

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Upload extends React.Component {
    state = {
        loaded: 0,
        title: "",
        description: "",
        highKey: "",
        mediumKey: "",
        lowKey: "",
        veryKey: "",
        files: {},
        fileName:""
    }
    handleChange = e => {
        console.log(e.target.value)
        if (e.currentTarget.name === 'files')
            this.setState({
                fileName:e.target.value,
                [e.target.name]: e.target.files
            })
        else {
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value
            })
        }
    }
    onClickHandler = () => {        
        console.log(this.state.files)
        var data = {
            title: this.state.title,
            description: this.state.description,
            highKey: this.state.highKey,
            mediumKey: this.state.mediumKey,
            lowKey: this.state.lowKey,
            veryKey: this.state.veryKey,
            facultyFirstName:this.props.facultyFirstName,
            faculutyLastName:this.props.faculutyLastName,
            facultyId:this.props.facultyId,
            date:new Date()
        }
        console.log(data)
        if (!data.title || !data.description || !data.highKey || !data.mediumKey || !data.lowKey || !data.veryKey) {
            this.props.enqueueSnackbar("Enter All Details", {
                variant: "error"
            });
        }
        else if (data.description.split(' ').length < 50) {
            this.props.enqueueSnackbar("Description must be atleast 50 words", {
                variant: "error"
            });
        }
        else if (data.highKey.split(' ').length !== 1 || data.mediumKey.split(' ').length !== 1 || data.lowKey.split(' ').length !== 1 || data.veryKey.split(' ').length !== 1) {
            this.props.enqueueSnackbar("Keywords should be 1 word", {
                variant: "error"
            });
        }
        else if (this.state.files.length === 0) {
            this.props.enqueueSnackbar("Select Files", {
                variant: "error"
            });
        }
        else {
            const dataToSend = new FormData();
            dataToSend.append("data", JSON.stringify(data));
            for (var i = 0; i < this.state.files.length; i++) {
                dataToSend.append('files', this.state.files[i]);
            }
            axios.post(IPAndPort+"/project/files/upload", dataToSend, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
                .then(res => {
                    console.log(res.data)
                    this.props.enqueueSnackbar("Uploded Sucess", {
                        variant: "success"
                    });
                    this.setState({
                        title: "",
                        description: "",
                        highKey: "",
                        mediumKey: "",
                        lowKey: "",
                        veryKey: "",
                        files:{},
                        fileName:""
                    })
                    setTimeout(() => {
                        this.setState({
                            loaded:0
                        })
                      }, 3000)
                })
                .catch(err => console.log(err))
        }


    }
    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <div className={classes.root}>
                <Card>
                    <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                        <Typography
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                color: "white"
                            }}
                        >
                            Upload Files
                        </Typography>
                    </Toolbar>
                    <CardContent className={classes.form}>
                        <TextField label="Title" name="title" onChange={this.handleChange} variant="outlined" value={this.state.title} fullWidth />
                        <TextField label="Description" value={this.state.description} name="description" onChange={this.handleChange} variant="outlined" multiline fullWidth rows={5} />
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <TextField label="High Priority Keyword" name="highKey" onChange={this.handleChange} value={this.state.highKey} variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField label="Medium Priority Keyword" name="mediumKey" onChange={this.handleChange} value={this.state.mediumKey} variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField label="Low Priority Keyword" name="lowKey" onChange={this.handleChange} value={this.state.lowKey} variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField label="Very Low Priority Keyword" name="veryKey" onChange={this.handleChange} value={this.state.veryKey} variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <input type="file" name="files" onChange={this.handleChange} multiple style={{ border: "1px solid darkGrey", padding: "5%", width: "100%" }} value={this.state.fileName} files={this.state.files}/>
                            </Grid>
                            <Grid item>
                                {/* <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress> */}
                                {/* {this.state.loaded+" %"} */}
                                {this.state.loaded < 35 ? (
                                    <Progress
                                        theme={{
                                            low: {
                                                color: "red"
                                            }
                                        }}
                                        width={75}
                                        percent={parseInt(this.state.loaded)}
                                        status="low"
                                        type="circle"
                                    />
                                ) : this.state.loaded > 75 ? (
                                    <Progress
                                        theme={{
                                            done: {
                                                color: "#4CAF50"
                                            }
                                        }}
                                        width={75}
                                        percent={parseInt(this.state.loaded)}
                                        status="done"
                                        type="circle"
                                    />
                                ) : (
                                            <Progress
                                                theme={{
                                                    active: {
                                                        color: "blue"
                                                    }
                                                }}
                                                width={75}
                                                percent={parseInt(this.state.loaded)}
                                                status="active"
                                                type="circle"
                                            />
                                        )}
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={this.onClickHandler} color="primary" size="large">Upload</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withSnackbar(withStyles(styles)(Upload));

