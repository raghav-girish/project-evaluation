import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  TextField
} from "@material-ui/core";
import axios from "axios";
import IPAndPort from './../IPAndPort';
import { withSnackbar } from 'notistack';



class srsPage extends Component {
  state = {
    disableStatus:false,
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
    if(this.props.user==='a')
    {
      this.setState({
        disableStatus:true
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

  updateSRS = () => {
    var data = {
      _id: this.state.project._id,
      introduction: this.state.introduction,
      abstract: this.state.abstract,
      users: this.state.users,
      functionality: this.state.functionality,
      componet: this.state.componet,
      software: this.state.software,
      scope: this.state.scope,
      interface: this.state.interface
    };
    if(!data._id || !data.introduction || !data.abstract || !data.users || !data.functionality || !data.componet || !data.software || !data.scope || !data.interface)
    {
      //alert("Fill All Details");
      this.props.enqueueSnackbar("Enter all Fields", {
        variant: 'error',
      });
    }
    else
    {
    axios
      .post(IPAndPort+"/project/srsForm", data)

      .then((response)=> {
        console.log(response.data);
        if (response.data.status === 1) {
          //alert("SRS Form Updated");
          this.props.enqueueSnackbar("SRS Form Updated", {
            variant: 'success',
          });
        } else {
          //alert("SRS Form Created");
          this.props.enqueueSnackbar("SRS Form Created", {
            variant: 'success',
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  };

  render() {
    return (
      <div style={{marginBottom:"2%"}}>

        <br />

        <div>
          <Grid container justify="center" alignItems="center" xs={12}>
            <Card style={{ marginTop: 20, width: "60%" }}>
                <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                  <Typography
                    style={{
                       color: "white"
                    }}
                  >
                    Enter SRS Details of the Project
                  </Typography>
                </Toolbar>
                <CardContent>
                <form style={{ marginTop: 20 }}>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="introduction"
                      label="Introduction"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.introduction}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="abstract"
                      label="Abstract"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.abstract}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="users"
                      label="Users"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.users}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="functionality"
                      label="Functionality"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.functionality}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="componet"
                      label="Components"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.componet}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="software"
                      label="Software"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.software}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="scope"
                      label="Scope"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.scope}
                    />
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <TextField
                    disabled={this.state.disableStatus}
                    style={{ width: "100%" }}
                      id="interface"
                      label="Interface"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={this.handleChange}
                      value={this.state.interface}
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
                      onClick={() => this.updateSRS()}
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

export default withSnackbar(srsPage);
