import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  Button,
  TextField,
  Card,
  CardContent,
  Grid
} from "@material-ui/core";
import axios from "axios";
import { withSnackbar } from 'notistack';
import IPAndPort from './../IPAndPort';


class basicPage extends Component {
  state = {
    disableStatus: false,
    project: [],
    introduction: "",
    abstract: "",
    users: "",
    functionality: "",
    componet: "",
    software: "",
    scope: "",
    interface: "",
    project_and_problem: "",
    interdiciplinary: "",
    foucs: "",
    objectives: "",
    methodology: "",
    location: "",
    duration: ""
  };

  componentDidMount() {
    var a = localStorage.getItem("project_id");
    var data = {
      _id: a
    };
    if (this.props.user === 'a') {
      this.setState({
        disableStatus: true
      })
    }
    if (a) {
      axios
        .post(
          IPAndPort+"/project/addproject/getIndividualProject",
          data
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            project: res.data[0]
          });
        })
        .catch(err => console.log(err));

      axios
        .post(IPAndPort+"/project/srsForm/getSRSDetails", data)
        .then(res => {
          console.log(res.data[0]);
          this.setState({
            introduction: res.data[0].introduction,
            abstract: res.data[0].abstract,
            users: res.data[0].users,
            functionality: res.data[0].functionality,
            componet: res.data[0].componet,
            software: res.data[0].software,
            scope: res.data[0].scope,
            interface: res.data[0].interface
          });
        })
        .catch(err => console.log(err));

      axios
        .post(
          IPAndPort+"/project/basicForm/getBasicFormDetails",
          data
        )
        .then(res => {
          console.log(res.data[0]);
          this.setState({
            project_and_problem: res.data[0].project_and_problem,
            interdiciplinary: res.data[0].interdiciplinary,
            foucs: res.data[0].foucs,
            objectives: res.data[0].objectives,
            methodology: res.data[0].methodology,
            location: res.data[0].location,
            duration: res.data[0].duration
          });
        })
        .catch(err => console.log(err));
    } else {
      alert("Please login again");
      this.props.history.push("/login");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };
  navback = () => {
    this.props.history.push("/projectHomePage");
  };

  updateBasic = () => {
    //console.log(this.state);
    var data = {
      _id: this.state.project._id,
      project_and_problem: this.state.project_and_problem,
      interdiciplinary: this.state.interdiciplinary,
      foucs: this.state.foucs,
      objectives: this.state.objectives,
      methodology: this.state.methodology,
      location: this.state.location,
      duration: this.state.duration
    };
    //console.log(data);
    if (!data._id || !data.project_and_problem || !data.interdiciplinary || !data.foucs || !data.objectives || !data.methodology || !data.location || !data.duration) {
      //alert("Fill All Details");
      this.props.enqueueSnackbar("Enter all Fields", {
        variant: 'error',
      });
    }
    else {
      axios
        .post(IPAndPort+"/project/basicForm", data)

        .then((response) => {
          console.log(response.data);
          if (response.data.status === 1) {

            this.props.enqueueSnackbar("Basic Form Updated", {
              variant: 'success',
            });
          } else {

            this.props.enqueueSnackbar("Basic Form Created", {
              variant: 'success',
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {

    return (
      <div style={{ marginBottom: "2%" }}>

        <div>
          <Grid container justify="center" alignItems="center" xs={12}>
            <Card style={{ marginTop: 20, width: "60%" }}>

              <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                <Typography
                  style={{
                    color: "white"
                  }}
                >
                  Enter Basic Details of the Project
                  </Typography>
              </Toolbar>
              <CardContent>
                <form style={{ marginTop: 20 }}>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="project_and_problem"
                      label="Project and the Problem"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.project_and_problem}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="interdiciplinary"
                      label="Inter Disciplinary Elements"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.interdiciplinary}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="foucs"
                      label="Focus of The Study"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.foucs}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="objectives"
                      label="Objective"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.objectives}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="methodology"
                      label="Methodology"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.methodology}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="location"
                      label="Location going to be implemented"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.location}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      disabled={this.state.disableStatus}
                      style={{ width: "100%" }}
                      id="duration"
                      label="Duration"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.duration}
                    />
                  </div>
                  {
                    !this.state.disableStatus ? (
                      <div style={{ marginTop: 10 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            marginLeft: "30%",
                            marginRight: "30%",
                            width: "40%",
                            marginTop: 25
                          }}
                          onClick={() => this.updateBasic()}
                        >
                          UPDATE
                    </Button>
                      </div>
                    ):""
                  }

                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withSnackbar(basicPage);
