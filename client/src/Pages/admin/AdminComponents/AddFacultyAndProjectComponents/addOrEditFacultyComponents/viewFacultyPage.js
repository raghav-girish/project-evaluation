import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Card,
  Paper,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import FullScreenModel from './../../../../FullScreenModel';
import LaunchIcon from '@material-ui/icons/Launch';
import { withSnackbar } from "notistack";
import FacultyProjectDetails from './../../../../faculty/FacultyComponents/FacultyProjectDetails';
import FacultyProfile from '././../../../../faculty/FacultyComponents/FacultyProfileComponents/profile'
import IPAndPort from './../../../../IPAndPort';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  root1: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});



class ViewFaculty extends Component {

  state = {
    open: false,
    open1: false,
    facultyDetails: [],
    facultyID: "",
    facultyIDToOpen: "",
    facultyNameToOpen: "",
    facultyWithoutAdmin: [],
    f_id: ""
  };

  //For Search Faculty
  facultyID = e => {
    this.setState({ facultyID: e.currentTarget.value });
  };

  search = () => {
    var data = {
      faculty_id: this.state.facultyID
    };
    axios
      .post(
        IPAndPort + "/project/addFaculty/getIndividualFacultyDetails",
        data
      )
      .then(res =>
        this.setState({
          facultyWithoutAdmin: res.data
        })
      )
      .catch(err => console.log(err));
  };

  navigate = (e) => {
    console.log(e)
    this.setState({
      facultyIDToOpen: e[0],
      facultyNameToOpen: e[1] + " " + e[2],
      open: true
    })
  };

  openFaculty = (e) => {

    this.setState({
      open1: true,
      fId: e
    })
  }

  deleteFaculty = (e) => {
    var data={
      facId:e
    }
    if(window.confirm('Are you sure to delete this facult?'))
    {
      axios
      .post(IPAndPort + "/project/addFaculty/deleteFaculty", data)
      .then(async response => {
        console.log(response.data);
        if(response.data===1)
        {
          this.props.enqueueSnackbar(
            "Faculty Removed Successful",
            {
              variant: "success"
            }
          )
          await this.refresh();
        }

      })
      .catch(err=>console.log(err))
    }
   
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleClose1 = () => {
    this.setState({
      open1: false
    })
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  refresh = () => {
    this.setState({
      facultyDetails: [],
      facultyWithoutAdmin: [],
      facultyID: ""
    });
    this.componentDidMount()
  }
  componentDidMount() {
    axios
      .get(IPAndPort + "/project/addFaculty/getFacultyDetails/")
      .then(res => {
        this.setState({
          facultyDetails: res.data
        });
        this.state.facultyDetails.map((v) => {
          if (v._id !== 'ADMIN') {
            this.setState({
              facultyWithoutAdmin: [...this.state.facultyWithoutAdmin, v]
            })
          }
          return 1;
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.facultyDetails);
    return (
      <div style={{ marginBottom: "2%" }}>
        <div>
          <Card
            style={{ marginLeft: "5%", marginRight: "5%", marginTop: 25 }}
          >
            <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
              <Typography
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "white"
                }}
              >
                Total No. of Faculties : {this.state.facultyWithoutAdmin.length}
              </Typography>
              <Paper component="form" className={classes.root1}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Faculty by Faculty ID"
                  onChange={e => this.facultyID(e)}
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
            </Toolbar>

            <Table size="large" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">FACUTY-ID</TableCell>
                  <TableCell align="center">FIRST NAME</TableCell>
                  <TableCell align="center">LAST NAME</TableCell>
                  <TableCell align="center">DEPARTMENT</TableCell>
                  <TableCell align="center">COLLEGE</TableCell>
                  <TableCell align="center">MOBILE NUMBER</TableCell>
                  <TableCell align="center">EMAIL ID</TableCell>
                  <TableCell align="center">PROJECTS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.facultyWithoutAdmin.map((item, index) =>
                  (

                    <TableRow>
                      <TableCell align="center">{item._id}</TableCell>
                      <TableCell align="center">{item.FIRST_NAME}</TableCell>
                      <TableCell align="center">{item.LAST_NAME}</TableCell>
                      <TableCell align="center">{item.DEPARTMENT}</TableCell>
                      <TableCell align="center">{item.COLLEGE}</TableCell>
                      <TableCell align="center">{item.MOBILE}</TableCell>
                      <TableCell align="center">{item.MAIL_ID}</TableCell>
                      <TableCell align="center">
                        {/* <Button
                          onClick={() => this.navigate([item._id, item.FIRST_NAME, item.LAST_NAME])}
                          variant="outlined"
                          color="primary"
                        >
                          Projects
                        </Button> */}
                        <IconButton
                          aria-label="search"
                          onClick={() => this.navigate([item._id, item.FIRST_NAME, item.LAST_NAME])}
                        >
                          <LaunchIcon />
                        </IconButton>

                      </TableCell>
                      <TableCell align="center">
                        {/* <Button variant="outlined" color="primary" onClick={(e)=>this.openFaculty(item._id)}>
                          EDIT
                        </Button> */}
                        <table>
                          <tr>
                            <td>
                              <IconButton
                                aria-label="search"
                                onClick={(e) => this.openFaculty(item._id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </td>
                            <td>
                              <IconButton
                                aria-label="search"
                                onClick={(e) => this.deleteFaculty(item._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </td>
                          </tr>
                        </table>

                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Card>
        </div>

        <FullScreenModel component={
          <div style={{ padding: "2%", marginTop: "-2%" }}>
            <FacultyProjectDetails f_id={this.state.facultyIDToOpen} f_name={this.state.facultyNameToOpen} fromAdmin="yes" />
          </div>
        } open={this.state.open} handleClose={this.handleClose} title="Projects Under Faculty" />

        <FullScreenModel component={
          <FacultyProfile fId={this.state.fId} handleClose={this.handleClose1} />
        } open={this.state.open1} handleClose={this.handleClose1} title="Faculty Profile" />
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(ViewFaculty));
