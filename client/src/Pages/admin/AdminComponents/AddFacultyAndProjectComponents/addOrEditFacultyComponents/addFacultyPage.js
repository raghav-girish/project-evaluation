import React, { Component } from "react";
import {
  TextField,
  Card,
  CardContent,
  Grid,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CSVReport from './CSVReport';
import { withSnackbar } from "notistack";
import FullScreenModel from './../../../../FullScreenModel';
import IPAndPort from './../../../../IPAndPort';
const axios = require("axios");

class AddFaculty extends Component {

  state = {
    F_ID: "",
    F_FNAME: "",
    F_LNAME: "",
    F_DEPT: "Electronics & Communication Engineering",
    F_COLLEGE: "K Ramakrishnan College of Engineering",
    ROLE: "F",
    F_MOBILE: "",
    F_MAIL: "",
    F_PASSWORD: "",
    invlidEmail: true,
    fileToUpload: null,
    csvResult: [],
    csvSuccessTotal: 0,
    open: false,
  };

  handleClose = e => {
    this.setState({
      open: false
    })
  }
  selectFile = e => {
    console.log(e.currentTarget.files[0]);
    this.setState({
      fileToUpload: e.currentTarget.files[0]
    })
  }

  uploadCSV = () => {
    const data = new FormData();
    data.append('file', this.state.fileToUpload)
    console.log(data);
    axios
      .post(IPAndPort+"/project/addFaculty/csv", data)

      .then(response => {
        console.log(response.data);
        this.setState({
          csvResult: response.data.updateResult,
          csvSuccessTotal: response.data.sucessTotal,
          open: true
        })
        if (response.data.sucessTotal > 0) {
          this.props.enqueueSnackbar(`${response.data.sucessTotal} faculty Updated`, {
            variant: "success"
          });
        }
        else {
          this.props.enqueueSnackbar("0 Faculty Updated", {
            variant: "error"
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  F_ID = e => {
    this.setState({ F_ID: e.currentTarget.value });
    this.setState({ F_PASSWORD: e.currentTarget.value });
  };

  validateemail = (x) => {
    console.log(x)
    try {
      var a = x.split('@')[1].split('.')
      console.log(a);
      if (a.length === 2) {
        this.setState({
          invlidEmail: false
        })
      }
    }
    catch (err) {
      alert('invalie email');
      console.log("invalid email")
    }
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
      PASSWORD: this.state.F_PASSWORD
    };
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
      }
      else {
        try {
          var a = data.MAIL_ID.split('@')[1].split('.')
          console.log(a);
          if (a.length === 2 && a[0] !== "") {
            axios
              .post(IPAndPort+"/project/addFaculty", data)

              .then(response => {
                console.log(response.data);
                if (response.data === "err") {
                  this.props.enqueueSnackbar("Faculty ID already exists !", {
                    variant: "error"
                  });
                }
                if (response.data === "Success") {
                  this.props.enqueueSnackbar(
                    "Faculty Details Added Successfully !",
                    {
                      variant: "success"
                    }
                  );
                  this.setState({
                    F_ID: "",
                    F_FNAME: "",
                    F_LNAME: "",
                    F_MOBILE: "",
                    F_MAIL: "",
                    F_PASSWORD: "",
                  })
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else {
            this.props.enqueueSnackbar("Invalid Email", {
              variant: "error"
            });
          }
        }
        catch (err) {
          this.props.enqueueSnackbar("Invalid Email", {
            variant: "error"
          });
        }
      }
    }
  };



  render() {
    return (

      <Grid container justify="center" alignItems="center" xs={12}>
        <Card style={{ marginTop: 20, width: "90%" }}>
          <CardContent>
            <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
              <Typography
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "white"
                }}
              >
                Add Faculty Details
                </Typography>
            </Toolbar>
            <form>
              <div>
                <TextField
                  label="New Faculty ID"
                  variant="outlined"
                  name="F_ID"
                  value={this.state.F_ID}
                  onChange={e => this.F_ID(e)}
                  style={{ width: "50%", marginLeft: "25%", marginTop: 20 }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="F_FNAME"
                  value={this.state.F_FNAME}
                  onChange={e => this.handleChange(e)}
                  style={{ width: "49.5%" }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="F_LNAME"
                  value={this.state.F_LNAME}
                  onChange={e => this.handleChange(e)}
                  style={{ width: "49.5%", marginLeft: "1%" }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <TextField
                  disabled
                  label="Department"
                  variant="outlined"
                  value="Electronics & Communication Engineering"
                  style={{ width: "49.5%" }}
                />
                <TextField
                  disabled
                  label="College"
                  value="K Ramakrishnan College of Engineering"
                  variant="outlined"
                  style={{ width: "49.5%", marginLeft: "1%" }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <TextField
                  disabled
                  label="Role"
                  value="Faculty"
                  variant="outlined"
                  style={{ width: "49.5%" }}
                />
                <TextField
                  label="Mobile"
                  variant="outlined"
                  name="F_MOBILE"
                  value={this.state.F_MOBILE}
                  onChange={e => this.handleChange(e)}
                  style={{ width: "49.5%", marginLeft: "1%" }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <TextField
                  label="Mail"
                  variant="outlined"
                  name="F_MAIL"
                  value={this.state.F_MAIL}
                  onChange={e => this.handleChange(e)}
                  style={{ width: "49.5%" }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={this.state.F_PASSWORD}
                  disabled
                  style={{ width: "49.5%", marginLeft: "1%" }}
                />
              </div>

              <div>
                <br />
                <Grid container spacing={5}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    item
                    xs={12}
                    sm={5}
                  >
                    <input type="file" name="file" onChange={this.selectFile} />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.uploadCSV}
                      style={{
                        width: "100%",
                        marginTop: 20
                      }}
                    >
                      Add .CSV File
                      </Button>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    item
                    xs={12}
                    sm={2}
                  >
                    <b style={{ textAlign: "center", marginTop: 20 }}>OR</b>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    item
                    xs={12}
                    sm={5}
                  >
                    <Button
                      //type="submit"
                      variant="outlined"
                      color="primary"
                      style={{
                        width: "100%",
                        marginTop: 20
                      }}
                      onClick={() => this.uploadFaculty()}
                    >
                      Add Faculty
                      </Button>
                  </Grid>
                </Grid>

              </div>
            </form>
          </CardContent>
        </Card>
        <FullScreenModel component={<CSVReport result={this.state.csvResult} sucessTotal={this.state.csvSuccessTotal}/>} open={this.state.open} handleClose={this.handleClose} title="CSV Update Report" />
      </Grid>

    );
  }
}

export default withSnackbar(AddFaculty);

