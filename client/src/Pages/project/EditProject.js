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
import IPAndPort from './../IPAndPort';

const axios = require("axios");

class EditProject extends Component {
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
    facultyWithoutAdmin: [],
    dis1:false,
    dis2:false,
    dis3:false,
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

  updateProject = () => {
    var {
     _id,
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
        _id:_id,
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
      console.log(data);
      axios
        .post(IPAndPort+"/project/addproject/updateProject", data)
        .then(response => {
          console.log(response.data);
          if (response.data === "sucess") {
            this.props.enqueueSnackbar("Project Updated Sucessfull", {
              variant: "success"
            });
            // this.props.handleClose();
          }
        })
        .catch(function(error) {
          console.log(error);
        });

        
    }
  };

  componentDidMount() {
    axios
      .get(IPAndPort+"/project/addFaculty/getFacultyDetails/")
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

      var data={
          _id:this.props.proId
      }
      axios
        .post(IPAndPort+"/project/addproject/getIndividualProject", data)
        .then((res)=>{
            console.log(res.data[0]);
            if(res.data[0].S1NO==="")
            {
                this.setState({
                    dis1:true
                })
            }
            if(res.data[0].S2NO==="")
            {
                this.setState({
                    dis2:true
                })
            }
            if(res.data[0].S3NO==="")
            {
                this.setState({
                    dis3:true
                })
            }
            this.setState({
                _id:this.props.proId,
                PTITLE: res.data[0].PTITLE,
                PDOMAIN:  res.data[0].PDOMAIN,
                PFACULTY:  res.data[0].PFACULTY,
                PFACULTY_NAME:  res.data[0].PFACULTY_NAME,
                LEAD:  res.data[0].LEAD,
                LEADREGNO:  res.data[0].LEADREGNO,
                S1NAME: res.data[0]. S1NAME,
                S1NO:  res.data[0].S1NO,
                S2NAME:  res.data[0].S2NAME,
                S2NO:  res.data[0].S2NO,
                S3NAME:  res.data[0].S3NAME,
                S3NO:  res.data[0].S3NO
            })
        })
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
                Project ID : {this.state._id}
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
                    disabled={this.state.dis1}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S1NO"
                    value={this.state.S1NO}
                    disabled={this.state.dis1}
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
                    
                    disabled={this.state.dis2}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S2NO"
                    value={this.state.S2NO}
                    
                    disabled={this.state.dis2}
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
                    
                    disabled={this.state.dis3}
                    onChange={e => this.handleChange(e)}
                    style={{ width: "49.5%" }}
                  />
                  <TextField
                    label="Reg.No"
                    variant="outlined"
                    name="S3NO"
                    value={this.state.S3NO}
                    
                    disabled={this.state.dis3}
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
                    onClick={() => this.updateProject()}
                  >
                    Update Details
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

export default withSnackbar(EditProject);
