import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  Button,
  Card,
  Grid,
  CardContent
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Progress } from "react-sweet-progress";
import { withStyles } from "@material-ui/core/styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectHome from "./../../project/adminProjectHomePage";
import FullScreenModel from './../../FullScreenModel';
import IPAndPort from './../../IPAndPort';
import { withRouter } from "react-router-dom";

import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "1%"
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginRight: "1%",
    marginLeft: "1%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  card: {
    maxWidth: 345,
    padding: "1%"
  }
});


class facultyHome extends Component {
  state = {
    project: [],
    open: false,
  };

  componentDidMount() {
    var a = localStorage.getItem("user");
    if(this.props.fromAdmin)
    {
      a=this.props.f_id
    }
    var data = {
      PFACULTY: a
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
    } else {
      alert("We Are Unable To Display Projects So Please Login Again");
      this.props.history.push("/login");
    }
  }

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

  navigate = e => {
    localStorage.setItem("project_id", e);
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
    this.componentDidMount();
  };



  render() {
    const { classes } = this.props;
    console.log(this.state.project);
    return (
      <div>
        {this.props.fromAdmin?(
          <h2>{this.props.f_name+" ("+this.props.f_id+")"}</h2>
        ):""}
        
        <Grid alignItems="center">
        {this.state.project.length===0?(<h2 style={{textAlign:"center"}}>No Projects Alloted yet</h2>):""}
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
          >
            <Masonry columnsCount={4}>
              {this.state.project.map((values, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Card
                      color="primary"
                      style={{
                        marginTop: 40
                      }}
                      className={classes.card}
                    >
                      <Toolbar style={{ backgroundColor: "#3f51b5" }}>
                        <Typography style={{ color: "white" }}>
                          {values.PTITLE}
                        </Typography>
                      </Toolbar>
                      <CardContent>
                        <div>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <b>Project-ID: {values._id}</b>
                            <br />
                            <b>Domain: </b>
                            {values.PDOMAIN}
                            <br />
                            <b>Leader: </b>
                            {values.LEAD}
                            <br />
                          </Typography>
                          {values.PROGRESS < 35 ? (
                            <Progress
                              theme={{
                                low: {
                                  color: "red"
                                }
                              }}
                              width={50}
                              percent={values.PROGRESS}
                              status="low"
                            />
                          ) : values.PROGRESS > 75 ? (
                            <Progress
                              theme={{
                                done: {
                                  color: "#4CAF50"
                                }
                              }}
                              width={50}
                              percent={values.PROGRESS}
                              status="done"
                            />
                          ) : (
                                <Progress
                                  theme={{
                                    active: {
                                      color: "blue"
                                    }
                                  }}
                                  width={50}
                                  percent={values.PROGRESS}
                                  status="active"
                                />
                              )}
                          {values.STATUS === "ACTIVE" ? (
                            <Button
                              onClick={() => this.pendingSnack()}
                              style={{
                                backgroundColor: "#4CAF50",
                                width: "50%",
                                marginLeft: "25%",
                                marginTop: 10
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
                                style={{
                                  backgroundColor: "#757575",
                                  width: "50%",
                                  marginLeft: "25%",
                                  marginTop: 10
                                }}
                              >
                                <Typography
                                  style={{ color: "white", fontSize: 13 }}
                                >
                                  CLOSED
                                </Typography>
                              </Button>
                            )}
                        </div>
                        <Button
                          onClick={() => this.navigate(values._id)}
                          style={{ width: "100%", marginTop: 20 }}
                          variant="outlined"
                          color="primary"
                        >
                          Open Project
                          </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </Grid>
        <FullScreenModel component={<ProjectHome user={this.props.fromAdmin?"a":"f"} />} open={this.state.open} handleClose={this.handleClose} title="Project Home Page" />

      </div>
    );
  }
}

export default withRouter(withSnackbar(withStyles(styles)(facultyHome)));
