import React from 'react';
import './css/scoreFrame.css';
import { PDFObject } from 'react-pdfobject'

class ScoreFrame extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      fileURL: null,
      fileExists: true,
      random: 0
    };
  }
  componentDidMount(){
  }

  resetIframe() {
    this.setState({random: this.state.random + 1});
}

  hideSpinner = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    // const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${this.props.filename}`;
    const googleUrlPDF = `https://docs.google.com/gview?url=${this.props.filename}&embedded=true`
    console.log(googleUrlPDF)
    return (
      <div className="container">
        <div className="innerContainer">
          <div className="iframeContainer">
            <PDFObject url={this.props.filename} />
            {/* {<iframe key={this.state.random} src={googleUrlPDF} title="embededPDF" />} */}
            {/* <button onClick={() => { this.resetIframe(); }}>Reset</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreFrame;
