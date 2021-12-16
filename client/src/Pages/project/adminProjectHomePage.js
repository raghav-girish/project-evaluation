import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ProjectDetails from './projectHomeComponents/ProjectDetails';
import ReviewDetails from './projectHomeComponents/ReviewDetails';
import BasicAndSRSDetails from './projectHomeComponents/BasicAndSRSDetails';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width:"50%",
    marginRight:"auto",
    marginLeft:"auto",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class adminProjectHomePage extends Component {
  state={
    value:0
  }
  setValue=(e)=>{
    this.setState({
      value:e
    })
  }
   handleChange = (event, newValue) => {
    this.setValue(newValue);
  };
  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginBottom: "2%" }}>

       <div className={classes.root}>

          <AppBar position="static">
          <Box align="center" style={{marginRight:"auto",marginLeft:"auto"}}>
            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">             
              <Tab label="Project Details" {...a11yProps(0)} />
              <Tab label="Review Details" {...a11yProps(1)} />
              <Tab label="Basic & SRS Status" {...a11yProps(2)} />              
            </Tabs>
            </Box >
          </AppBar>
          <TabPanel value={this.state.value} index={0} style={{marginTop:"4%"}}>
            <ProjectDetails user={this.props.user}/>
          </TabPanel>
          <TabPanel value={this.state.value} index={1} style={{marginTop:"4%"}}>
            <ReviewDetails user={this.props.user}/>
          </TabPanel>
          <TabPanel value={this.state.value} index={2} style={{marginTop:"4%"}}>
            <BasicAndSRSDetails user={this.props.user}/>
          </TabPanel>

       </div>

      </div>
    );
  }
}

export default withStyles(styles)(adminProjectHomePage);
