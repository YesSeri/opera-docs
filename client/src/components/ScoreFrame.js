import React from 'react';
import './css/scoreFrame.css';

class ScoreFrame extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      fileURL: null,
      fileExists: true,
    };
  }

  hideSpinner = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${this.props.filename}`;
    return (
      <div className="container">
        <div className="innerContainer">
          <div className="iframeContainer">
            {<iframe src={googleUrlPDF} title="embededPDF" />}
            {/* 
            
          <object data={googleUrlPDF} type="application/pdf">
          </object>
            {this.state.fileURL ? (
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
