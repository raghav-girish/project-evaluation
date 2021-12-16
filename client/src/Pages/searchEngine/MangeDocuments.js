import React, { Component } from "react";
import { Typography, Toolbar, IconButton, Button, Table, TableHead, TableCell, Grid, TableRow, FormControl, MenuItem, InputLabel, Select, TableBody, Card, Tooltip, Paper, InputBase } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Progress } from "react-sweet-progress";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import IPAndPort from './../IPAndPort';
import { withRouter } from "react-router-dom";
import LaunchIcon from '@material-ui/icons/Launch';
import FullScreenModel from './../FullScreenModel';
import Files from './Files';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import FilterListIcon from '@material-ui/icons/FilterList';

const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        flex: 1
    },
    root1: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 260
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
});




class ManageDocuments extends Component {

    state = {
        files: [],
        open: false,
        resultToPass: [],
        PFACULTY: "",
        PFACULTY_NAME: "",
        facultyWithoutAdmin: [],
        search: "",
        temp: []
    }

    componentDidMount() {
        var a = localStorage.getItem("user");

        if (a === "ADMIN") {
            axios
                .get(IPAndPort + "/project/files/getAllFiles")
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        temp: res.data,
                        files: res.data
                    })
                })
                .catch(err => console.log(err));

            axios
                .get(IPAndPort + "/project/addFaculty/getFacultyDetails/")
                .then(res => {
                    this.setState({
                        facultyDetails: res.data
                    });
                    this.state.facultyDetails.map(v => {
                        if (v._id !== "ADMIN") {
                            this.setState({
                                facultyWithoutAdmin: [...this.state.facultyWithoutAdmin, v]
                            });
                        }
                        return 1;
                    });
                })
                .catch(err => console.log(err));

        } else {
            alert("Please Login Again");
            this.props.history.push("/login");
        }
    }

    openDocuments = e => {
        console.log(this.state.files[e.currentTarget.id])
        this.setState({
            open: true,
            resultToPass: this.state.files[e.currentTarget.id]
        })
    }

    handleClose = e => {
        this.setState({
            open: false
        })
    }

    deleteProject = (e) => {
        console.log(e)
        var data = {
            fileId: e
        }
        if (window.confirm('Are you sure to delete this Documents?')) {
            axios
                .post(IPAndPort + "/project/files/deleteFile", data)
                .then(res => {
                    console.log(res.data)
                    if (res.data === 1) {
                        this.props.enqueueSnackbar(
                            "Documents Removed Successful",
                            {
                                variant: "success"
                            }
                        )
                    }
                    this.refresh();
                })
                .catch(err => console.log(err));
        }
    }

    search = (e) => {
        var data = {
            search: this.state.search
        }
        axios
            .post(IPAndPort + "/project/files/find", data)
            .then(res => {
                console.log(res.data)
                this.setState({
                    files: res.data,
                    temp: res.data,
                })
            })
            .catch(err => console.log(err));
    }
    refresh = () => {
        this.setState({
            files: [],
            resultToPass: [],
            PFACULTY: "",
            PFACULTY_NAME: "",
            facultyWithoutAdmin: [],
            search: "",
            temp: []
        });
        this.componentDidMount()
    }


    setSearch = (e) => {
        console.log(e.currentTarget.value)
        this.setState({
            search: e.currentTarget.value
        })
    }

    PFACULTY = e => {
        console.log(e.target.value);
        var arr = e.target.value.split("-");
        console.log(arr);
        this.setState({ PFACULTY: arr[1] });
        this.setState({ PFACULTY_NAME: arr[0] });
    };

    filter = async e => {
        await this.setState({
            files: []
        })
        if (this.state.PFACULTY === "all") {
            this.setState({
                files: this.state.temp
            })
        }
        else {
            this.state.temp.map((v, i) => {
                if (v.FACULTY_ID === this.state.PFACULTY) {
                    this.setState({
                        files: [...this.state.files, v]
                    });
                }
            })
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <Card style={{ marginLeft: "10%", marginRight: "10%", marginTop: 10 }}>


                <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                    <Typography style={{ marginLeft: "auto", marginRight: "auto", color: "white" }}>
                        Uploded Documents
                    </Typography>

                    {/* Search Project */}
                    <Paper component="form" className={classes.root1}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search By Title or Keyword"
                            value={this.state.search}
                            onChange={this.setSearch}
                        />
                        <IconButton
                            onClick={() => this.search()}
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Button variant="contained" color="secondary" style={{ marginLeft: "1%" }} onClick={this.refresh}>Refresh</Button>
                    {/* Search Project */}
                </Toolbar>
                <div style={{ padding: "1%" }}>
                    <FormControl
                        //variant="outlined"
                        style={{ width: "20%" }}
                    >
                        <InputLabel>Filter By Faculty</InputLabel>
                        <Select
                            onChange={this.PFACULTY}
                            value={
                                this.state.PFACULTY !== ""
                                    ? `${this.state.PFACULTY_NAME}-${this.state.PFACULTY}`
                                    : "all-all"
                            }
                            labelWidth={100}
                        >
                            <MenuItem value={"all-all"}>
                                All Faculty
                            </MenuItem>
                            {this.state.facultyWithoutAdmin.map((v, i) =>
                                (
                                    <MenuItem value={`${v.FIRST_NAME} ${v.LAST_NAME}-${v._id}`}>
                                        {v.FIRST_NAME} {v.LAST_NAME} - {v._id}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    &nbsp;
                    &nbsp;
                    <IconButton
                        onClick={() => this.filter()}
                        className={classes.iconButton}
                        aria-label="search"
                    >
                        <FilterListIcon style={{ fontSize: "40px" }} />
                    </IconButton>

                </div>
                <div>
                    <Table size="large" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">TITLE</TableCell>
                                <TableCell align="center">Faculty Name</TableCell>
                                <TableCell align="center">Faculty ID</TableCell>
                                <TableCell align="center">Keywords</TableCell>
                                <TableCell align="center">Uploaded On</TableCell>
                                <TableCell align="center">OPEN</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.files.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {item.TITLE}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.FACULTY_FNAME + " " + item.FACULTY_LNAME}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.FACULTY_ID}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.HIGH} {item.MEDIUM} {item.LOW} {item.VERY_LOW}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.Data}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="search"
                                            id={index}
                                            onClick={this.openDocuments}
                                        >
                                            <LaunchIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="search"
                                            onClick={(e) => this.deleteProject(item._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <FullScreenModel component={<Files data={this.state.resultToPass} />} open={this.state.open} handleClose={this.handleClose} title="Uploded Documents" />
            </Card>


        );
    }
}

export default withRouter(withSnackbar(withStyles(styles)(ManageDocuments)));


