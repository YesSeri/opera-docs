import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-spinkit';
import './css/scoreFrame.css';

const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${props.filename}`;
class ScoreFrame extends React.Component(props) {
  constructor() {
    super();
    const frameToUpdate = document.getElementById('myIframe');
    this.state = {
      loading: true,
      loadingFailed: false,
      loadAttempts: 0,
      iframe: frameToUpdate,
    };
  }

  componentDidMount() {
    console.log('mount unmount');

    const timer = setInterval(() => {
      reloadIframe();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }
  componentWillUnmount() {}
  reloadIframe = () => {
    
    this.setState({iframe: iframe})
    setLoadAttempts(loadAttempts + 1);
    this.setState({loadAttempts: loadAttempts + 1})
    if (this.state.loadAttempts > 1) {
      this.setState({loading: false, loadingFailed: true})
      setLoadingFailed(true);
      clearInterval(timer);
    }
  };
  handleLoad = () => {
    setLoading(false);
    clearInterval(timer);
  };

  renderIframe = () => {
    console.log(`loading${this.state.loading}   loadingfailed${this.state.loadingFailed}`);
    return (
      <div className="iframeContainer">
        {this.state.loading && !this.state.loadingFailed ? <div>Loading</div> : null}

        <iframe
          style={{
            visibility: this.state.loading && !this.state.loadingFailed ? 'hidden' : 'visible',
          }}
          id="myIframe"
          src={googleUrlPDF}
          title="title"
          onLoad={handleLoad}
        />
      </div>
    );
  };
  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          {this.state.loading ? <a href={googleUrlPDF}>Download File</a> : null}
          {renderIframe()}
        </div>
      </div>
    );
  }
}

export default ScoreFrame;
