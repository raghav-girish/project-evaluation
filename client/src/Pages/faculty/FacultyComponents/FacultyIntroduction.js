import React, { Component } from "react";
import {
  IconButton,
  Grid,
  Paper,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ProfilePage from "./FacultyProfileComponents/profile";
import Upload from './../../searchEngine/Upload';
import FullScreenModel from './../../FullScreenModel';
import { withRouter } from "react-router-dom";
import IPAndPort from './../../IPAndPort';

import axios from "axios";

class FacultyIntroduction extends Component {
  state = {
    project: [],
    faculty: {},
    open1: false,
    open2:false,
  };

  componentDidMount() {
    var a = localStorage.getItem("user");
    var data = {
      PFACULTY: a,
      faculty_id: a
    };

    if (a) {
      axios
        .post(
          IPAndPort+"/project/addproject/getFacultyProjectDetails",
          data
        )
        .then(res => {
          this.setState({
            project: res.data
          });
        })
        .catch(err => console.log(err));

      axios
        .post(
          IPAndPort+"/project/addFaculty/getIndividualFacultyDetails",
          data
        )
        .then(res => {
          console.log(res.data[0])
          this.setState({
            faculty: res.data[0]
          })
        })
        .catch(err => console.log(err));
    } else {
      alert("We Are Unable To Identify Your Id So Please Login Again");
      this.props.history.push("/login");
    }
  }


  handleClickOpenProfile = () => {
    this.setState({
      open1: true
    });
  };

  handleClickOpenUpload = () => {
    this.setState({
      open2: true
    });
  };

  handleCloseProfile = () => {
    this.setState({
      open1: false
    });
    this.componentDidMount();
  };
  handleCloseUpload = () => {
    this.setState({
      open2: false
    });
    this.componentDidMount();
  };

  render() {
    console.log(this.state.project);
    return (

      <div >
        <Paper style={{ padding: 1, width: "100%" }}>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <h3 style={{ marginLeft: 20 }}>
                Welcome {this.state.faculty.FIRST_NAME + " " + this.state.faculty.LAST_NAME} (
                  {this.state.faculty._id}) !
                </h3>
              <h4 style={{ marginLeft: 20 }}>
                Total No. Of Projects : {this.state.project.length}
              </h4>
            </Grid>
            <Grid item>              
                <IconButton
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickOpenProfile()}
                >
                  <PersonIcon style={{ fontSize: 45 }} />
                </IconButton>
                <IconButton
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickOpenUpload()}
                >
                  <CloudUploadIcon style={{ fontSize: 45 }} />
                </IconButton>             
            </Grid>
          </Grid>
        </Paper>




        <FullScreenModel component={<ProfilePage handleClose={this.handleCloseProfile} />} open={this.state.open1} handleClose={this.handleCloseProfile} title=" My Profile" />

        <FullScreenModel component={<Upload facultyFirstName={this.state.faculty.FIRST_NAME}faculutyLastName={this.state.faculty.LAST_NAME} facultyId={this.state.faculty._id}/>} open={this.state.open2} handleClose={this.handleCloseUpload} title="Cloud Storage" />

      </div>
    );
  }S
}

export default withRouter(FacultyIntroduction);
