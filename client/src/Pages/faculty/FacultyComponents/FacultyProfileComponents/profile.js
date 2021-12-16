import React, { Component } from "react";
import {
  TextField,
  Card,
  CardContent,
  Grid,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import IPAndPort from './../../../IPAndPort'
const axios = require("axios");


class Profile extends Component {
  state = {
    adminView:false,
    F_ID: "",
    F_FNAME: "",
    F_LNAME: "",
    F_DEPT: "Electronics & Communication Engineering",
    F_COLLEGE: "K Ramakrishnan College of Engineering",
    ROLE: "F",
    F_MOBILE: "",
    F_MAIL: "",
    F_PASSWORD: "",
    F_PASSWORD_CHANGED: ""
  };

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  changePswd = e => {
    this.setState({
      F_PASSWORD_CHANGED: e.currentTarget.value
    })
  }
  uploadFaculty = () => {
    var data = {
      USER_ID: this.state.F_ID,
      FIRST_NAME: this.state.F_FNAME,
      LAST_NAME: this.state.F_LNAME,
      DEPARTMENT: this.state.F_DEPT,
      COLLEGE: this.state.F_COLLEGE,
      ROLE: this.state.ROLE,
      MOBILE: this.state.F_MOBILE,
      MAIL_ID: this.state.F_MAIL,
      PASSWORD: this.state.F_PASSWORD,
      CHANGED_PASSWORD: this.state.F_PASSWORD_CHANGED
    };
    if (data.CHANGED_PASSWORD !== "") {
      this.props.enqueueSnackbar("You Have Changed The Password", {
        variant: "success"
      });
    }
    if (
      !data.USER_ID ||
      !data.FIRST_NAME ||
      !data.LAST_NAME ||
      !data.DEPARTMENT ||
      !data.COLLEGE ||
      !data.ROLE ||
      !data.MOBILE ||
      !data.MAIL_ID ||
      !data.PASSWORD
    ) {
      this.props.enqueueSnackbar("Enter all Fields", {
        variant: "error"
      });
    } else {
      if (data.MOBILE.length !== 10 || isNaN(data.MOBILE)) {
        this.props.enqueueSnackbar("Enter Valid Mobile Number", {
          variant: "error"
        });
      } else {
        console.log(data);
        axios
          .post(IPAndPort+"/project/addFaculty/UpdateFaculty", data)

          .then(response => {
            console.log(response.data);
            if (response.data === "err") {
              this.props.enqueueSnackbar("Faculty ID already exists !", {
                variant: "error"
              });
            }
            if (response.data === "Success") {
              this.props.handleClose();
              this.props.enqueueSnackbar(
                "Updated Successfully",
                {
                  variant: "success"
                }
              );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  componentDidMount() {
    var data={};
    if (this.props.fId) {
      this.setState({
        adminView:true
      })
      data={
        faculty_id:this.props.fId
      }
    }
    else {
       data = {
        faculty_id: localStorage.getItem("user")
      };
    }
    axios
      .post(
        IPAndPort+"/project/addFaculty/getIndividualFacultyDetails",
        data
      )
      .then(res => {
        console.log(res.data[0]);
        this.setState({
          F_ID: res.data[0]._id,
          F_FNAME: res.data[0].FIRST_NAME,
          F_LNAME: res.data[0].LAST_NAME,
          F_DEPT: res.data[0].DEPARTMENT,
          F_COLLEGE: res.data[0].COLLEGE,
          ROLE: res.data[0].ROLE,
          F_MOBILE: res.data[0].MOBILE,
          F_MAIL: res.data[0].MAIL_ID,
          F_PASSWORD: res.data[0].PASSWORD,
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div style={{ marginBottom: "2%" }}>
        <Grid container justify="center" alignItems="center" xs={12}>
          <Card style={{ marginTop: 20, width: "80%" }}>
            <CardContent>
              <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                <Typography
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "white"
                  }}
                >
                  MY PROFILE
                </Typography>
              </Toolbar>
              <form>
                <div>
                  <TextField
                    disabled={!this.state.adminView}
                    variant="outlined"
                    value={this.state.F_ID}
                    name="F_ID"
                    onChange={e => this.handleChange(e)}
                    style={{ width: "50%", marginLeft: "25%", marginTop: 20 }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                    value={this.state.F_FNAME}
                    name="F_FNAME"
                    style={{ width: "50%" }}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    value={this.state.F_LNAME}
                    name="F_LNAME"
                    onChange={e => this.handleChange(e)}
                    style={{ width: "50%" }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <TextField
                    disabled
                    label="Department"
                    variant="outlined"
                    value="Electronics & Communication Engineering"
                    style={{ width: "50%" }}
                  />
                  <TextField
                    disabled
                    label="College"
                    value="K Ramakrishnan College of Engineering"
                    variant="outlined"
                    style={{ width: "50%" }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <TextField
                    disabled
                    label="Role"
                    value="Faculty"
                    variant="outlined"
                    style={{ width: "50%" }}
                  />
                  <TextField
                    label="Mobile"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                    value={this.state.F_MOBILE}
                    name="F_MOBILE"
                    style={{ width: "50%" }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <TextField
                    label="Mail"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                    value={this.state.F_MAIL}
                    name="F_MAIL"
                    style={{ width: "50%" }}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    disabled={this.state.adminView}
                    onChange={e => this.changePswd(e)}
                    style={{ width: "50%" }}
                  />
                </div>

                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      marginLeft: "80%",
                      width: "20%",
                      marginTop: 20
                    }}
                    onClick={() => this.uploadFaculty()}
                  >
                    UPDATE DETAILS
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}
export default withSnackbar(Profile);
