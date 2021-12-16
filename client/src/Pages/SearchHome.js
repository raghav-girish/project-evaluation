import React from "react";
import Paper from "@material-ui/core/Paper";
import { InputBase, Button, AppBar, Toolbar, Typography, Grid, Container } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import SpeechRecognition from 'react-speech-recognition';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";
import logo from "./searchEngine/1.PNG";

const options = {
  autoStart: false
}

const styles = theme => ({
  root: {
    width: "100%",
    borderRadius: "25px",
    display: 'flex',
    flexDirection: 'row'
  },
  middlePage: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchVoiceAndStop = this.searchVoiceAndStop.bind(this);
  }
  state = {
    search: "",
    speekDisplay:"none"
  }

  static getDerivedStateFromProps(props, state) {
    if (props.transcript) {
      return { search: props.transcript };
    }
    return { a: 1 }
  }
  handleChange = (e) => {
    this.setState({
      search: e.currentTarget.value
    })
  }
  Login = e => {
    this.props.history.push("/login");
  }
  Search = () => {
    this.props.stopListening();
    localStorage.setItem('search', this.state.search)
    this.props.history.push("/search")
  };
  clearAll = () => {
    this.props.resetTranscript();
    this.setState({
      search: ""
    })
  } 
  async searchVoiceAndStop() {
    await this.setState({
      search: this.props.transcript
    })
    this.props.stopListening();
    this.Search();
  }
  render() {
    const { classes } = this.props;
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props

    if (!browserSupportsSpeechRecognition) {
      return (<h1>Error</h1>)
    }
    return (
      <div style={{ position: "relative" }}>
      <Paper style={{
         overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          paddingTop:"0.5%",
          paddingBottom:"0.5%"
        }} >
        <Toolbar >
          <Grid container direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <Typography variant="h5">
                KRCE Search Engine
            </Typography>
            </Grid>
            <Grid>
              <Button variant="outlined" onClick={() => this.Login()} size="large">
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        </Paper>
        <Container component="main" maxWidth="sm" >
          <div
            className={classes.middlePage}
          >
            <img
              src={logo}
              alt="Logo"
              height="150px"
              width="200px"
            />
            <br />
            <br />
            <Paper
              elevation={2}
              className={classes.root}
            >

              <InputBase
                name="search"
                placeholder="Search By Keyword or Title"
                style={{ marginLeft: "15px" }}
                onChange={this.handleChange}
                value={this.state.search}
                fullWidth
                inputProps={{ 'aria-label': 'search google maps' }}
              />

              <IconButton color="primary" aria-label="search" onClick={startListening}>
                <MicIcon />
              </IconButton>
              <IconButton color="primary" aria-label="directions" onClick={this.searchVoiceAndStop}>
                <MicOffIcon />
              </IconButton>
            </Paper>            
            <br />
            <span style={{display:`${this.state.speekDisplay}`}}>Speek Something...</span>
            <br />
            <Grid container direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.Search()}
                >
                  Search
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.clearAll}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(SpeechRecognition(options)(Search));
