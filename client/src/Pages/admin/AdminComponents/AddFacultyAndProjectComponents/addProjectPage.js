import React, { Component } from "react";
import {
  TextField,
  Card,
  CardContent,
  Grid,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import IPAndPort from './../../../IPAndPort';

const axios = require("axios");

class AddProject extends Component {
  state = {
    _id: "",
    PTITLE: "",
    PDOMAIN: "",
    PFACULTY: "",
    PFACULTY_NAME: "",
    LEAD: "",
    LEADREGNO: "",
    S1NAME: "",
    S1NO: "",
    S2NAME: "",
    S2NO: "",
    S3NAME: "",
    S3NO: "",
    facultyDetails: [],
    facultyWithoutAdmin: []
  };

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  PDOMAIN = e => {
    this.setState({ PDOMAIN: e.target.value });
  };
  PFACULTY = e => {
    console.log(e.target.value);
    var arr = e.target.value.split("-");
    console.log(arr);
    this.setState({ PFACULTY: arr[1] });
    this.setState({ PFACULTY_NAME: arr[0] });
  };

  createProject = () => {
    var {
      PTITLE,
      PDOMAIN,
      PFACULTY,
      PFACULTY_NAME,
      LEAD,
      LEADREGNO,
      S1NAME,
      S1NO,
      S2NAME,
      S2NO,
      S3NAME,
      S3NO
    } = this.state;

    var data = {
      PTITLE: PTITLE,
      PDOMAIN: PDOMAIN,
      PFACULTY: PFACULTY,
      PFACULTY_NAME: PFACULTY_NAME,
      LEAD: LEAD,
      LEADREGNO: LEADREGNO,
      S1NAME: S1NAME,
      S1NO: S1NO,
      S2NAME: S2NAME,
      S2NO: S2NO,
      S3NAME: S3NAME,
      S3NO: S3NO
    };


    if (
      !data.PTITLE ||
      !data.PDOMAIN ||
      !data.PFACULTY ||
      !data.LEAD ||
      !data.LEADREGNO
    ) {
      this.props.enqueueSnackbar("Enter all Fields", {
        variant: "error"
      });
    } else {
      var s1 = true, s2 = true, s3 = true;
      if (data.S1NAME == "" && data.S1NO != "" || data.S1NAME != "" && data.S1NO == "") {
        s1 = false
      }
      if (data.S2NAME == "" && data.S2NO != "" || data.S2NAME != "" && data.S2NO == "") {
        s2 = false
      }
      if (data.S3NAME == "" && data.S3NO != "" || data.S3NAME != "" && data.S3NO == "") {
        s3 = false
      }
      var optional = s1 && s2 && s3
      if (!optional) {
        this.props.enqueueSnackbar('Fill Both Name and RegNo', {
          variant: "error"
        });
      }
      else {
        var r1 = true, r2 = true, r3 = true, r4 = true;
        if(data.LEADREGNO.length!==12 || isNaN(data.LEADREGNO))
        {
          r1=false
        }
        if(data.S1NO!="" && data.S1NO.length!==12 || isNaN(data.S1NO))
        {
          r2=false
        }
        if(data.S2NO!="" && data.S2NO.length!==12 || isNaN(data.S2NO))
        {
          r3=false
        }
        if(data.S3NO!="" && data.S3NO.length!==12 || isNaN(data.S3NO))
        {
          r4=false
        }
        var reg = r1 && r2 && r3 && r4;
        if (!reg) {
          this.props.enqueueSnackbar('Invalid Register Number', {
            variant: "error"
          });
        }
        else {
          console.log(data);
          axios
            .post(IPAndPort + "/project/addproject", data)
            .then(response => {
              console.log(response.data);
              if (response.data.status === "sucess") {
                this.props.enqueueSnackbar("Project Created", {
                  variant: "success"
                });
                // this.props.handleClose();
                this.setState({
                  PTITLE: "",
                  PDOMAIN: "",
                  PFACULTY: "",
                  PFACULTY_NAME: "",
                  LEAD: "",
                  LEADREGNO: "",
                  S1NAME: "",
                  S1NO: "",
                  S2NAME: "",
                  S2NO: "",
                  S3NAME: "",
                  S3NO: ""
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  };

  componentDidMount() {
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
  }

  render() {
    return (
      <div style={{ marginBottom: "2%" }}>
        <Grid container justify="center" alignItems="center" xs={12}>
          <Card style={{ marginTop: 20, width: "80%" }}>
            <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
              <Typography
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "white"
                }}
              >
                Add Project Details
              </Typography>
            </Toolbar>
            <CardContent>
              <form style={{ marginTop: 20 }}>
                <div>
                  <h3>Project Info :</h3>
                  <TextField
                    label="Project Title"
                    variant="outlined"
                    name="PTITLE"
                    value={this.state.PTITLE}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "79%" }}
                  />
                  <FormControl
                    variant="outlined"
                    style={{ width: "20%", marginLeft: "1%" }}
                  >
                    <InputLabel>Domain</InputLabel>
                    <Select
                      onChange={this.PDOMAIN}
                      id="PDOMAIN"
                      value={this.state.PDOMAIN}
                      labelWidth={55}
                    >
                      <MenuItem value={"Embedded Systems"}>
                        Embedded-Systems
                      </MenuItem>
                      <MenuItem value={"VLSI"}>VLSI</MenuItem>
                      <MenuItem value={"Telecommunications"}>
                        Telecommunications
                      </MenuItem>
                      <MenuItem value={"Signal Processing"}>
                        Signal Processing
                      </MenuItem>
                      <MenuItem value={"Automation"}>Automation</MenuItem>
                    </Select>
                  </FormControl>
                  <h3>User Info :</h3>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel>Select Faculty</InputLabel>
                    <Select
                      onChange={this.PFACULTY}
                      value={
                        this.state.PFACULTY !== ""
                          ? `${this.state.PFACULTY_NAME}-${this.state.PFACULTY}`
                          : ""
                      }
                      labelWidth={100}
                    >
                      {this.state.facultyWithoutAdmin.map((item, index) => (
                        <MenuItem
                          value={`${item.FIRST_NAME} ${item.LAST_NAME}-${item._id}`}
                        >
                          {item.FIRST_NAME} {item.LAST_NAME} - {item._id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Student Project Lead"
                    variant="outlined"
                    name="LEAD"
                    value={this.state.LEAD}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="LEADREGNO"
                    value={this.state.LEADREGNO}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%", marginLeft: "1%" }}
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Student 1"
                    variant="outlined"
                    name="S1NAME"
                    value={this.state.S1NAME}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S1NO"
                    value={this.state.S1NO}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%", marginLeft: "1%" }}
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Student 2"
                    variant="outlined"
                    name="S2NAME"
                    value={this.state.S2NAME}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S2NO"
                    value={this.state.S2NO}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%", marginLeft: "1%" }}
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Student 3"
                    variant="outlined"
                    name="S3NAME"
                    value={this.state.S3NAME}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S3NO"
                    value={this.state.S3NO}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%", marginLeft: "1%" }}
                  />
                </div>
                <div>
                  <Button
                    //type="submit"
                    variant="outlined"
                    color="primary"
                    style={{
                      marginLeft: "80%",
                      width: "20%",
                      marginTop: 25
                    }}
                    onClick={() => this.createProject()}
                  >
                    Add Project
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

export default withSnackbar(AddProject);
