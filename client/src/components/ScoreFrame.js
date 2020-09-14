import React from 'react';
import './css/scoreFrame.css';
import { PDFObject } from 'react-pdfobject';

class ScoreFrame extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      fileURL: null,
      fileExists: true,
      random: 0,
    };
  }
  componentDidMount(){
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!')
    }, 1000);
    return () => clearTimeout(timer);
  }
  handleLoad = () => {
    console.log('handleLoad');
    this.setState({ loading: false });
  };

  resetIframe() {
    this.setState({ random: this.state.random + 1 });
  }

  renderIframe = () => {
    const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${this.props.filename}`;
    // const googleUrlPDF = `https://docs.google.com/gview?url=${this.props.filename}&embedded=true`
    console.log(googleUrlPDF);
    return (
      <div className="iframeContainer">
        <iframe
          style={{visibility: this.state.loading ? "hidden" : "visible"}}
          id="myIframe"
          key={this.state.random}
          src={googleUrlPDF}
          title="embededPDF"
          onLoad={this.handleLoad}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          {/* {this.state.loading ? <a href={googleUrlPDF}>Download File</a> : null} */}
          {this.renderIframe()}
        </div>
      </div>
    );
  }
}

export default ScoreFrame;
