import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import IPAndPort from './IPAndPort';
import { withSnackbar } from "notistack";

const axios = require("axios");


const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://www.consysa.com/forum/uploads/0de4be328030ea3d8b7581a9d32c66f5.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Login extends React.Component {
  state = {
    UNAME: "",
    PASSWORD: "",
    status: 0
  };

  componentDidMount() {}

  login = e => {
    e.preventDefault();
    var data = {
      USER_ID: this.state.UNAME,
      PASSWORD: this.state.PASSWORD
    };
    axios
      .post(IPAndPort+"/project/loginCheck", data)
      .then(res => {
        if (res.data.status === 2) {
          //alert("Enter correct crendentials");
          this.props.enqueueSnackbar("Incorrecnt Credentials", {
            variant: "error"
          });
        } else {
          if (res.data.role === "A") {
            this.props.enqueueSnackbar("Login Successfull", {
              variant: "success"
            });
            localStorage.setItem("user", this.state.UNAME);
            localStorage.setItem("fullname", res.data.uname);
            this.props.history.push("/coordinatorHome");
          } else {
            this.props.enqueueSnackbar("Login Successfull", {
              variant: "success"
            });
            localStorage.setItem("user", this.state.UNAME);
            localStorage.setItem("fullname", res.data.uname);
            this.props.history.push("/facultyHome");
          }
        }
      })
      .catch(err => console.log(err));
  };

  UNAME = e => {
    this.setState({ UNAME: e.currentTarget.value });
  };

  PASSWORD = e => {
    this.setState({ PASSWORD: e.currentTarget.value });
  };
  render() {
    console.log(localStorage.getItem("myValueInLocalStorage"));
    const { classes } = this.props;
    return (
      <div>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={8} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <div className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="User ID"
                  name="email"
                  onChange={e => this.UNAME(e)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => this.PASSWORD(e)}
                  autoComplete="current-password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => this.login(e)}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(Login));
