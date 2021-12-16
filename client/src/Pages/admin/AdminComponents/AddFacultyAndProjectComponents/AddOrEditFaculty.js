import React, { Component } from "react";

import ViewFacultyPage from './addOrEditFacultyComponents/viewFacultyPage';
import AddFacultyPage from './addOrEditFacultyComponents/addFacultyPage';

class AddFaculty extends Component {
  
  render() {

    return (
      <div style={{marginBottom:"2%"}}>

            <AddFacultyPage/>

            <ViewFacultyPage/>                   
        
      </div>
    );
  }
}
export default AddFaculty;
