import React, { Component } from "react";

import FacultyHomeHeader from './FacultyComponents/FacultyHomeHeader';
import FacultyIntroduction from './FacultyComponents/FacultyIntroduction';
import FacultyProjectDetails from './FacultyComponents/FacultyProjectDetails';
import CssBaseline from '@material-ui/core/CssBaseline';
class facultyHome extends Component {
  
  render() {
    return (
      <div>
        <CssBaseline />
        <div style={{position:"sticky",top:0,zIndex:1}}>
        <FacultyHomeHeader/> 
        </div>
                     
        <div style={{ padding: "1%" }}>    
          <FacultyIntroduction/>    
          <FacultyProjectDetails/>                     
        </div>
      </div>
    );
  }
}

export default facultyHome;
