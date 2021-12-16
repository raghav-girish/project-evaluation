import React, { Component } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({  
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  } 
});


class FacultyHomeHeader extends Component {  

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
                Faculty Home
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

export default withRouter(withStyles(styles)(FacultyHomeHeader));
