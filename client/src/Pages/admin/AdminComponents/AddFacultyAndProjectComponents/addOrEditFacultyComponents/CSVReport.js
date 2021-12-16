import React, { Component } from "react";

class CSVReport extends Component {
  

  render() {
    return (
        <div style={{textAlign:"center"}}>
        <h1>Report</h1>
        <p><strong>Total:</strong> {this.props.result.length}</p>
        <p><strong>Sucess: </strong>{this.props.sucessTotal}</p>
        {this.props.result.map((v,i)=>
            v.status===0 ?(
                <h2 key={i} style={{color:"red" }}>{v.query}</h2>
            ):
            (
                <h2 key={i} style={{color: "green" }}>{v.query}</h2>
            )
        )}
      </div>
    );    
  }
}

export default CSVReport;
