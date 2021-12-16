// import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { Box, TextField } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// // import Speach from './Speach';
// import axios from 'axios';

// class Search extends React.Component {
    // state = {
    //     key: "",
    //     result:[],

    // }
    // handleChange = e => {
    //     this.setState({
    //         [e.currentTarget.name]: e.currentTarget.value
    //     })
    // }
    // onClickHandler = () => {
    //     this.setState({
    //         key:"",
    //         result:[],
    //     })
    //     var data = {
    //         KEY:this.state.key
    //     }       
    //     axios.post(IPAndPort+"/files/find", data)
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({
    //                 result:res.data
    //             })
    //         })

    // }
//     render() {
//         console.log(this.state);
        
//         return (
            // <div>
            //     <Box p={5}>
            //         <Paper elevation={3} align="center">
            //             <Box p={5}>
            //                 <TextField label="Enter The Key Word" name="key" style={{ marginRight: "1%", width: "45%" }} onChange={this.handleChange} />
            //                 <br /><br />

            //                 <Button variant="contained" color="primary" onClick={this.onClickHandler}>
            //                     Search
            //                 </Button><br/>
            //                 {
            //                     this.state.result.map((v,i)=>
            //                         (
            //                             <div key={i}>
            //                                 <h1>{v.TITLE}</h1>
            //                                 <a href={IPAndPort+""+v.file[0].substring(7)}>IPAndPort"+"{v.file[0].substring(7)}</a>
            //                                 <br/><br/>
            //                                 <embed src={IPAndPort+""+ v.file[0].substring(7) }  width="200px" height="200px"/>
            //                             </div>
            //                         )
            //                     )
            //                 }
            //             </Box>
            //             {/* <Speach/> */}
                        
            //         </Paper>
            //     </Box>

            // </div>
//         )
//     }
// }

// export default Search;

import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import Paper from '@material-ui/core/Paper';
import { Box, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import NormaModel from './../NomralModel';
import IPAndPort from './../IPAndPort';
const options = {
    autoStart: false
  }

class Search extends Component {
    state = {
        key: "",
        result:[],
        open: false,

    }    
    handleOpen = (e) => {
        this.setState({
            open: true,
        })
    };

    handleClose = (e) => {
        this.setState({
            open: false
        })
    };
    handleChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    searchVoiceAndStop=()=>{
        this.setState({
            key:this.props.transcript
        })
        this.props.stopListening();
        
    }
    onClickHandler = () => {
        
        this.setState({
            key:"",
            result:[],
        })
        var data = {
            KEY:this.state.key
        }              
        axios.post(IPAndPort+"/files/find", data)
            .then(res => {
                console.log(res.data)
                this.setState({
                    result:res.data
                })
            })

    }
    
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition,startListening} = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    

    return (
        <div>
                <Box p={5}>
                    <Paper elevation={3} align="center">
                        <Box p={5}>
                            <TextField label="Enter The Key Word" name="key" value={this.state.key} style={{ marginRight: "1%", width: "45%",border:"0px !important" }} onChange={this.handleChange} />
                            <br /><br />

                            <Button variant="contained" color="primary" onClick={this.onClickHandler}>
                                Search
                            </Button>
                            <br/><br/>
                            <button onClick={resetTranscript}>Reset</button>
                            <button onClick={startListening}>Start</button>
                            <button onClick={this.searchVoiceAndStop}>Stop</button>
                            <button onClick={this.handleOpen}>Model open</button>
                            <br/>
                            <span>{transcript}</span>
                            {
                                this.state.result.map((v,i)=>
                                    (
                                        <div key={i}>
                                            <h1>{v.TITLE}</h1>
                                            <a href={IPAndPort+""+v.file[0].substring(7)}>IPAndPort"+"{v.file[0].substring(7)}</a>
                                            <br/><br/>
                                            <embed src={IPAndPort+""+ v.file[0].substring(7) }  width="200px" height="200px"/>
                                        </div>
                                    )
                                )
                            }                            
                        </Box>                     
                        
                    </Paper>
                        <NormaModel open={this.state.open} handleClose={this.handleClose}component={(<Paper style={{padding:"20%"}}>Assif</Paper>)}/>
                </Box>

            </div>
    
    )
  }
}

export default SpeechRecognition(options)(Search);
