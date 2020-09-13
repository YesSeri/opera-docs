import React from 'react';
import axios from 'axios';
import './css/scoreFrame.css';
const Spinner = require('react-spinkit');

class ScoreFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      fileURL: null,
      fileExists: true,
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/pieces/getfile/${id}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const file = new Blob([response.data], {
          filename: 'aaaa',
          type: 'application/pdf',
        });
        file.arrayBuffer().then((value) => {
          console.log(value.slice());
        });
        this.setState({ fileURL: URL.createObjectURL(file) });
      })
      .catch((error) => {
        this.setState({
          fileExists: false,
        });
        console.log(error);
      });
  }

  hideSpinner = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          <div className="iframeContainer">
              <iframe src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://operadocs.com/wp-content/uploads/2019/01/1.2-Non-sperar-se-non-muccidi.pdf`}></iframe>
            {/* {this.state.fileURL ? (
              <object
                type="application/pdf"
                title="pdfObject"
                data={`${this.state.fileURL}`}
                onLoad={this.hideSpinner}
              />
            ) : (
              <Spinner name="line-scale-pulse-out" />
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreFrame;
