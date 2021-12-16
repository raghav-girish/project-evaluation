import React, { Component } from "react";
import { Typography, Toolbar, IconButton, Button, Table, TableHead, TableCell, Grid, TableRow, FormControl, MenuItem, InputLabel, Select, TableBody, Card, Tooltip, Paper, InputBase } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Progress } from "react-sweet-progress";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from "axios";
import AdminProjectHome from "./../../project/adminProjectHomePage";
import FullScreenModel from './../../FullScreenModel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IPAndPort from './../../IPAndPort';
import { withRouter } from "react-router-dom";
import EditProject from './../../project/EditProject';
import LaunchIcon from '@material-ui/icons/Launch';
import ManageDocuments from './../../searchEngine/MangeDocuments';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

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




class coordinatorHome extends Component {

    state = {
        projectDetails: [],
        facultyDetails: [],
        facultyName: "",
        report: 1,
        _id: "",
        open: false,
        open1: false,
        open2:false,
        proId: ""
    };

    componentDidMount() {
        var a = localStorage.getItem("user");

        if (a === "ADMIN") {
            axios
                .get(IPAndPort + "/project/addProject/getProjectDetails")
                .then(res =>
                    this.setState({
                        projectDetails: res.data
                    })
                )
                .catch(err => console.log(err));

            console.log(this.state.projectDetails);

            axios
                .get(IPAndPort + "/project/addFaculty/getFacultyDetails/")
                .then(res =>
                    this.setState({
                        facultyDetails: res.data
                    })
                )
                .catch(err => console.log(err));
        } else {
            alert("You Cannot View Projects List So Please Login Again");
            this.props.history.push("/login");
        }
    }


    //Search Project Id
    projectID = e => {
        this.setState({ _id: e.currentTarget.value });
    };

    navigate = e => {
        console.log(e);
        localStorage.setItem("project_id", e);
        localStorage.setItem("open", true);
        this.setState({
            open: true
        });
    };
    handleClose = () => {
        this.setState({
            open: false
        })
        this.componentDidMount();
    };
    handleClose1 = () => {
        this.setState({
            open1: false
        })
        this.componentDidMount();
    };
    handleClose2 = () => {
        this.setState({
            open2: false
        })
        this.componentDidMount();
    };

    pendingSnack = () => {
        this.props.enqueueSnackbar("Project not yet Completed", {
            variant: "warning"
        });
    };
    closedSnack = () => {
        this.props.enqueueSnackbar("Project Completed", {
            variant: "success"
        });
    };

    search = () => {
        var data = {
            _id: this.state._id
        };
        axios
            .post(
                IPAndPort + "/project/addProject/getIndividualProject",
                data
            )
            .then(res =>
                this.setState({
                    projectDetails: res.data
                })
            )
            .catch(err => console.log(err));
    };

    refresh = () => {
        this.setState({
            projectDetails: [],
            facultyDetails: [],
            _id: ""
        });
        this.componentDidMount()
    }

    getReport = () => {
        var data = {
            Review: this.state.report
        }
        axios.post('http://localhost:5000/project/report/getReport', data)
            .then((res) => {
                console.log(res.data);
                window.location = res.data;
            })
            .catch(err => {
                console.log(err)
            })
    }
    setReportNumber = (e) => {
        console.log(e.target.value)
        this.setState({
            report: e.target.value
        })
    }
    editProject = (e) => {
        console.log(e)
        this.setState({
            open1: true,
            proId: e
        })
    }
    deleteProject = (e) => {
        var data = {
            proId: e
        }
        if (window.confirm('Are you sure to delete this Project?')) {
            axios
                .post(IPAndPort + "/project/addproject/deleteProject", data)
                .then(async (res) => {
                    if (res.data === 1) {
                        this.props.enqueueSnackbar(
                            "Project Removed Successful",
                            {
                                variant: "success"
                            }
                        )
                        await this.refresh();
                    }
                })
        }
    }

    openCloud=e=>{
        this.setState({
            open2:true
        })
    }

    render() {

        const { classes } = this.props;

        return (

            <div>
                <div style={{ marginBottom: "1%",marginLeft:"11%" }} >

                    {/* Get Report */}
                        <Select
                            onChange={this.setReportNumber}
                            id="Report"
                            value={this.state.report}
                            labelWidth={55}
                        >
                            <MenuItem value={1}>
                                Review 1
                                </MenuItem>
                            <MenuItem value={2}>
                                Review 2
                                    </MenuItem>
                            <MenuItem value={3}>
                                Review 3
                                    </MenuItem>
                            <MenuItem value={4}>
                                Review 4
                                </MenuItem>
                            <MenuItem value={5}>
                                Review 5
                                </MenuItem>
                        </Select>

                        <IconButton onClick={this.getReport} color="secondary">
                            <GetAppIcon />
                        </IconButton>
                    {/* Get Report */}

                    {/* Cloud Storage */}
                    {/* <IconButton onClick={this.openCloud} color="primary" style={{ marginLeft: "5%" }}>
                                <CloudQueueIcon style={{ fontSize: 38 }} />
                            </IconButton> */}
                    <Button variant="outlined" color="primary" onClick={this.openCloud}  style={{marginLeft:"5%"}}>
                        Cloud
                    </Button>
                    {/* Cloud Storage */}

                </div>



                <Card style={{ marginLeft: "10%", marginRight: "10%", marginTop: 10 }}>


                    <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                        <Typography style={{ marginLeft: "auto", marginRight: "auto", color: "white" }}>
                            PROJECTS
                        </Typography>

                        {/* Search Project */}
                        <Paper component="form" className={classes.root1}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Projects by Project ID"
                                value={this.state._id}
                                onChange={e => this.projectID(e)}
                            />
                            <IconButton
                                onClick={() => this.search()}
                                className={classes.iconButton}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        {/* Search Project */}
                        <Button variant="contained" color="secondary" style={{ marginLeft: "1%" }} onClick={this.refresh}>Refresh</Button>
                    </Toolbar>
                    <div>
                        <Table size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">PROJECT ID</TableCell>
                                    <TableCell align="center">TITLE</TableCell>
                                    <TableCell align="center">DOMAIN</TableCell>
                                    <TableCell align="center">FACULTY</TableCell>
                                    <TableCell align="center">PROJECT LEAD</TableCell>
                                    <TableCell align="center">PROGRESS</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center">OPEN</TableCell>
                                    <TableCell align="center">ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.projectDetails.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{item._id}</TableCell>
                                        <TableCell align="center">{item.PTITLE}</TableCell>
                                        <TableCell align="center">{item.PDOMAIN}</TableCell>
                                        <TableCell align="center">
                                            {item.PFACULTY_NAME} - {item.PFACULTY}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.LEAD} - {item.LEADREGNO}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.PROGRESS < 35 ? (
                                                <Progress
                                                    theme={{
                                                        low: {
                                                            color: "red"
                                                        }
                                                    }}
                                                    type="circle"
                                                    width={50}
                                                    percent={item.PROGRESS}
                                                    status="low"
                                                />
                                            ) : item.PROGRESS > 75 ? (
                                                <Progress
                                                    theme={{
                                                        done: {
                                                            color: "#4CAF50"
                                                        }
                                                    }}
                                                    type="circle"
                                                    width={50}
                                                    percent={item.PROGRESS}
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
                                                            width={50}
                                                            percent={item.PROGRESS}
                                                            status="active"
                                                        />
                                                    )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.STATUS === "ACTIVE" ? (
                                                <Button
                                                    onClick={() => this.pendingSnack()}
                                                    style={{
                                                        backgroundColor: "#4CAF50",
                                                        width: "100%"
                                                    }}
                                                >
                                                    <Typography
                                                        style={{ color: "white", fontSize: 13 }}
                                                    >
                                                        ACTIVE
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                    <Button
                                                        onClick={() => this.closedSnack()}
                                                        style={{ backgroundColor: "grey", width: "100%" }}
                                                    >
                                                        <Typography
                                                            style={{ color: "white", fontSize: 13 }}
                                                        >
                                                            CLOSED
                                                        </Typography>
                                                    </Button>
                                                )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="View Detailed Information">
                                                {/* <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => this.navigate(parseInt(item._id))}
                                                >
                                                    VIEW
                                                </Button> */}
                                                <IconButton
                                                    aria-label="search"
                                                    onClick={() => this.navigate(parseInt(item._id))}
                                                >
                                                    <LaunchIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <IconButton
                                                            aria-label="search"
                                                            onClick={(e) => this.editProject(item._id)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton
                                                            aria-label="search"
                                                            onClick={(e) => this.deleteProject(item._id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            </table>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>


                <FullScreenModel component={<AdminProjectHome user="a" />} open={this.state.open} handleClose={this.handleClose} title="Project Home Page" />
                <FullScreenModel component={<EditProject proId={this.state.proId} />} open={this.state.open1} handleClose={this.handleClose1} title="Edit Project Details" />

                <FullScreenModel component={<ManageDocuments />} open={this.state.open2} handleClose={this.handleClose2} title="Cloud Storage" />

            </div>
        );
    }
}

export default withRouter(withSnackbar(withStyles(styles)(coordinatorHome)));


