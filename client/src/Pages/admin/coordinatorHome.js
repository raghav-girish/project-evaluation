import React, { Component } from "react";

import AdminProjectDetails from './AdminComponents/AdminProjectDetails';
import AdminHomeHeader from './AdminComponents/AdminHomeHeader';
import AddFacultyAndProject from './AdminComponents/AddFacultyAndProject';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  appbar: {
    position: "sticky !important",
    top:0,
    zIndex:1
  }
});

class coordinatorHome extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{ marginBottom: "2%" }}>
        <CssBaseline />
        <div className={classes.appbar}>
          <AdminHomeHeader />
        </div>
        <AddFacultyAndProject />
        <AdminProjectDetails />
      </div>
    );

  }
}

export default withStyles(styles)(coordinatorHome);

