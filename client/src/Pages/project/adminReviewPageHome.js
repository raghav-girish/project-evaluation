import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  Button,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Fade
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import IPAndPort from './../IPAndPort'
const axios = require("axios");

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
    marginLeft: "1%"
  }
});

class ReviewHome extends Component {
  state = {
    date: new Date(),
    points: "",
    coments: "",
    suggestions: "",
    studentIdforMarks: 0,
    studentMarksFieldsNames: ["field 1", "field 2", "field 3", "field 4", "field 5"],
    review: 1,
    progress: 0,
    display: false,
    disableStatus: false,
    buttons: [{ marks: [0] }],
    but1: true,
    but2: false,
    but3: false,
    but4: false,
  };

  onClickDisableEnable = (e) => {
    //alert(e.currentTarget.id)
    console.log(this.state.buttons[e.currentTarget.id].marks)
    this.setState({
      studentIdforMarks: e.currentTarget.id,
      [e.currentTarget.name]: true,
    })
    if (e.currentTarget.name === "but1") {
      this.setState({
        but2: false,
        but3: false,
        but4: false,
      })
    }
    if (e.currentTarget.name === "but2") {
      this.setState({
        but1: false,
        but3: false,
        but4: false,
      })
    }
    if (e.currentTarget.name === "but3") {
      this.setState({
        but1: false,
        but2: false,
        but4: false,
      })
    }
    if (e.currentTarget.name === "but4") {
      this.setState({
        but1: false,
        but2: false,
        but3: false,
      })
    }
  }

  handleChangeMarks = (e) => {
    console.log(this.state.buttons);
    console.log(this.state.studentIdforMarks);
    console.log(e.currentTarget.id);
    console.log(e.currentTarget.value)
    console.log('answer')
    console.log(this.state.buttons[this.state.studentIdforMarks].marks[e.currentTarget.id])
    if (e.currentTarget.value >= 0 && e.currentTarget.value <= 5) {
      this.state.buttons[this.state.studentIdforMarks].marks[e.currentTarget.id] = e.currentTarget.value
      this.forceUpdate()
    }
  }
  submitReview = () => {
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      review: this.state.review,
      date: this.state.date,
      points: this.state.points,
      coments: this.state.coments,
      suggestions: this.state.suggestions,
      progress: this.state.progress,
      buttons: this.state.buttons
    };
    //console.log(data);
    if (
      !data.date ||
      !data.points ||
      !data.coments ||
      !data.suggestions ||
      !data.progress ||
      !data.review
    ) {
      this.props.enqueueSnackbar("Enter all Details", {
        variant: "error"
      });
    } else {
      this.props.enqueueSnackbar("Updated Successfully", {
        variant: "success"
      });
      axios
        .post(IPAndPort+"/project/review/addReview", data)
        .then(res => {
          // alert("Updated SuccessFully");
          // console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };
  componentDidMount() {
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      review: 1
    };
    if (this.props.user === "f") {
      this.setState({
        disableStatus: true
      });
    }
    axios
      .post(IPAndPort+"/project/review/getReview", data)
      .then(res => {
        console.log(res.data);
        console.log(new Date(res.data.R_DATE));
        if (res.data.R_DATE === "") {
          this.setState({
            date: new Date()
          })
        }
        else {
          this.setState({
            date: new Date(res.data.R_DATE * 1000)
          })

        }
        var students = []
        for (var i = 0; i < res.data.R_Students.length; i++) {
          if (res.data.R_Students[i].Name !== "") {
            students.push({
              name: `but${i + 1}`,
              value: res.data.R_Students[i].Name + "-" + res.data.R_Students[i].RegNo,
              marks: [res.data.R_Students[i].q1, res.data.R_Students[i].q2, res.data.R_Students[i].q3, res.data.R_Students[i].q4, res.data.R_Students[i].q5]
            })
          }
        }
        console.log(students);
        this.setState({
          points: res.data.R_POINTS,
          coments: res.data.R_COMMENTS,
          suggestions: res.data.R_SUGGESTIONS,
          buttons: students,
          progress: res.data.R_PROGRESS,
        });
      }).
      catch(err => console.log(err));
  }
  handleDateChange = date => {
    this.setState({
      date: date
    });
    console.log(date);
    console.log(this.state);
  };
  handlePoints = e => {
    this.setState({
      points: e.currentTarget.value
    });
  };
  handleComents = e => {
    this.setState({
      coments: e.currentTarget.value
    });
  };
  handleSuggestions = e => {
    this.setState({
      suggestions: e.currentTarget.value
    });
  };
  handleSlide = e => {
    console.log(e);
    this.setState({
      progress: e
    });
  };


  setReview = e => {
    this.setState({
      review: e.target.value
    });
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      review: e.target.value
    };
    axios
      .post(IPAndPort+"/project/review/getReview", data)
      .then(res => {
        console.log(res.data);
        console.log(new Date(res.data.R_DATE));
        if (res.data.R_DATE === "") {
          this.setState({
            date: new Date()
          })
        }
        else {
          this.setState({
            date: new Date(res.data.R_DATE * 1000)
          })

        }
        var students = []
        for (var i = 0; i < 4; i++) {
          if (res.data.R_Students[i].Name !== "") {
            students.push({
              name: `but${i + 1}`,
              value: res.data.R_Students[i].Name + "-" + res.data.R_Students[i].RegNo,
              marks: [res.data.R_Students[i].q1, res.data.R_Students[i].q2, res.data.R_Students[i].q3, res.data.R_Students[i].q4, res.data.R_Students[i].q5]
            })
          }
        }
        console.log(students);
        this.setState({
          points: res.data.R_POINTS,
          coments: res.data.R_COMMENTS,
          suggestions: res.data.R_SUGGESTIONS,
          buttons: students,
          progress: res.data.R_PROGRESS,
        });
      })
      .catch(err => console.log(err));
  };
  openReview = () => {
    this.setState({
      display: true
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div style={{ marginBottom: "2%" }}>
          <Card style={{ width: "70%", marginLeft: "15%" }}>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <FormControl
                variant="outlined"
                style={{ width: "50%", marginLeft: "25%" }}
              >
                <InputLabel>Choose Review</InputLabel>
                <Select onChange={this.setReview} value={this.state.review}>
                  <MenuItem value={1}>Review 1</MenuItem>
                  <MenuItem value={2}>Review 2</MenuItem>
                  <MenuItem value={3}>Review 3</MenuItem>
                  <MenuItem value={4}>Review 4</MenuItem>
                  <MenuItem value={5}>Review 5</MenuItem>
                </Select>
              </FormControl>
              <Button
                style={{
                  width: "20%",
                  marginLeft: "40%",
                  marginTop: 20,
                  marginBottom: 20,
                }}

                variant="outlined"
                color="primary"
                onClick={() => this.openReview()}
              >
                Open Review Form
              </Button>
            </div>
          </Card>
          <Fade in={this.state.display}>
            <Card style={{ width: "70%", marginLeft: "15%" }}>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disabled={this.state.disableStatus}
                      margin="normal"
                      id="date-picker-dialog"
                      label="Select Date"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      value={this.state.date}
                      onChange={e => this.handleDateChange(e)}
                    />
                    <KeyboardTimePicker
                      disabled={this.state.disableStatus}
                      margin="normal"
                      id="time-picker"
                      label="Select Time"
                      KeyboardButtonProps={{
                        "aria-label": "change time"
                      }}
                      value={this.state.date}
                      onChange={this.handleDateChange}
                    />
                  </Grid>
                  <form style={{ marginTop: 20 }}>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                        disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Points_Discussed"
                        label="Points Discussed"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handlePoints}
                        value={this.state.points}
                      />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                        disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Comments"
                        label="Comments"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handleComents}
                        value={this.state.coments}
                      />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                        disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Suggestions"
                        label="Suggestions"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handleSuggestions}
                        value={this.state.suggestions}
                      />
                    </div>
                  </form>

                  <Card>
                    <Grid container justify="space-evenly" direction="row">
                      <Grid
                        item
                        justify="center"
                        direction="column"
                        alignItems="center"
                      >
                        {this.state.buttons.map((v, i) => (
                          <div key={i}>
                            <Button
                              color="primary"
                              variant="outlined"
                              name={v.name}
                              id={i}
                              onClick={this.onClickDisableEnable}
                              disabled={this.state[v.name]}
                              style={{
                                width: 500,
                                height: 70,
                                marginTop: 10
                              }}
                            >
                              {v.value}
                            </Button>
                          </div>
                        ))}
                      </Grid>
                      <Grid item justify="center">
                        {this.state.buttons[this.state.studentIdforMarks].marks.map((v, i) => (
                          (
                            <div key={i}>
                              <TextField
                                variant="outlined"
                                label={this.state.studentMarksFieldsNames[i]}
                                id={i}
                                onChange={this.handleChangeMarks}
                                style={{ marginBottom: 10, width: 100, marginTop: 10 }}
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 5 } }}
                                value={v}
                              ></TextField>
                            </div>
                          )
                        ))}

                      </Grid>
                    </Grid>
                  </Card>

                  <Card style={{ marginTop: 20, width: "100%" }}>
                    <div
                      style={{
                        textAlign: "center",
                        width: "80%",
                        marginLeft: "10%"
                      }}
                    >
                      <Typography>Progress Level</Typography>
                      <Slider
                        disabled={this.state.disableStatus}
                        style={{ marginTop: 40 }}
                        value={this.state.progress}
                        onChange={(e, value) => this.handleSlide(value)}
                        step={1}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="on"
                      />
                    </div>
                  </Card>
                  {!this.state.disableStatus ? (
                    <Button
                      style={{
                        width: "20%",
                        marginLeft: "40%",
                        marginTop: 20,
                        marginBottom: 20
                      }}
                      variant="outlined"
                      color="primary"
                      onClick={() => this.submitReview()}
                    >
                      Submit Review
                    </Button>
                  ) : (
                      ""
                    )}
                </MuiPickersUtilsProvider>
              </div>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(ReviewHome));
