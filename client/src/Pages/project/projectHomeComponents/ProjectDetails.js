import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import "react-sweet-progress/lib/style.css";
import IPAndPort from './../../IPAndPort';
import axios from "axios";

class ProjectDetails extends Component {
  state = {
    project: {},

    duration: "",

    status: "Not Completed"
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

  componentDidMount() {
    var a = localStorage.getItem("project_id");
    var data = {
      _id: parseInt(a)
    };
    if (a) {
      axios
        .post(
          IPAndPort+"/project/facultyProjectHome/projectDetails",
          data
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            project: res.data
          });
        })
        .catch(err => console.log(err));
    }

    axios
      .post(IPAndPort+"/project/addProject/getProjectDuration", data)
      .then(res => {
        console.log(new Date(res.data[0].START_DATE * 1000).toDateString());
        console.log(
          new Date((res.data[0].END_DATE - res.data[0].START_DATE) * 1000)
        );
        if (res.data[0].END_DATE === 0) {
          this.setState({
            duration:
              new Date(res.data[0].START_DATE * 1000).toDateString() +
              "-" +
              "Till Date"
          });
        } else {
          this.setState({
            duration:
              "From " +
              new Date(res.data[0].START_DATE * 1000).toDateString() +
              " till " +
              new Date(res.data[0].END_DATE * 1000).toDateString()
          });
        }
      })

      .catch(err => console.log(err));


  }

  render() {
    console.log(this.state.icon2);
    return (

      <Paper
        style={{
          width: "90%",
          marginLeft: "5%",
          marginRight: "5%"
        }}
      >
        <Toolbar
          style={{ textAlign: "center", backgroundColor: "#3f51b5 " }}
        >
          <Typography
            style={{
              fontSize: 20,
              color: "white"
            }}
          >
            Project Details
            </Typography>
        </Toolbar>
        <div style={{ padding: 15 }}>
          {this.state.project.STATUS === "ACTIVE" ? (
            <Button
              onClick={() => this.pendingSnack()}
              style={{
                backgroundColor: "green",
                width: "50%",
                marginLeft: "25%"
              }}
            >
              <Typography style={{ color: "white", fontSize: 13 }}>
                ACTIVE
                </Typography>
            </Button>
          ) : (
              <Button
                onClick={() => this.closedSnack()}
                style={{
                  backgroundColor: "#757575",
                  width: "50%",
                  marginLeft: "25%"
                }}
              >
                <Typography style={{ color: "white", fontSize: 13 }}>
                  CLOSED
                </Typography>
              </Button>
            )}
          <Typography style={{ fontSize: 16, marginTop: 10 }}>
            <b>Project ID: {this.state.project._id}</b>
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Domain</b>: {this.state.project.PDOMAIN}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Title</b>: {this.state.project.PTITLE}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Project Lead</b>: {this.state.project.LEAD} -{" "}
            {this.state.project.LEADREGNO}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Student 1:</b> {this.state.project.S1NAME} -{" "}
            {this.state.project.S1NO}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Student 2:</b> {this.state.project.S2NAME} -{" "}
            {this.state.project.S2NO}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Student 3:</b> {this.state.project.S3NAME} -{" "}
            {this.state.project.S3NO}
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            <b>Duration :</b> {this.state.duration}
          </Typography>
        </div>
      </Paper>
    );
  }
}

export default withSnackbar(ProjectDetails);
