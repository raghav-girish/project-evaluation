import React from 'react';
import Camera from 'react-html5-camera-photo';
import axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import IPAndPort from './../IPAndPort';


class ImageTest extends React.Component {

  handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log(dataUri.substring(0, 10));
    var data = {
      dataUri: dataUri
    }
    axios.post(IPAndPort + "/project/files/imagerec", data)
      .then(res => {
        console.log(res.data)
        this.props.search(res.data);
      })
  }

    render() {
      return (
        <div>
          <Camera
          height="400px"       
            isImageMirror={false}
            onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }}
          />

        </div>
      )

    }
  
}

export default ImageTest;