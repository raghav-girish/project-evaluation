import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  Button,
  AppBar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

class AdminHomeHeader extends Component {
  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="sticky" style={{ marginBottom: 20 }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Admin Home
            </Typography>
            <Button onClick={() => this.logout()} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AdminHomeHeader));
