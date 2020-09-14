import React, { useState, useEffect, useRef } from 'react';
import './css/scoreFrame.css';
var Spinner = require('react-spinkit');

function ScoreFrame({ filename }) {
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [time, setTime] = useState(2500);
  const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`;

  useEffect(() => {
    // I need to try and reload the page because google viewer doesnt always render as it should. If the iframe loads, then I stop the attempts to rerender.
    if (time && loadAttempts > 4) {
      console.log('aaa');
      setLoadingFailed(true);
      console.log(loadAttempts);
      setTime(null);
    }
  }, [loadAttempts, time]);

  useInterval(() => {
    let iframe = document.getElementById('myIframe');
    iframe.src = iframe.src;
    setLoadAttempts(loadAttempts + 1);
  }, time);

  const handleLoad = () => {
    setTime(null);
    setLoading(false);
    setLoadingFailed(false);
  };

  const renderIframe = () => {
    return (
      <div className="iframeContainer">
        <iframe
          style={{
            visibility: loading && !loadingFailed ? 'hidden' : 'visible',
          }}
          id="myIframe"
          src={googleUrlPDF}
          title="title"
          onLoad={handleLoad}
        />
      </div>
    );
  };
  return (
    <div className="container">
      <div className="innerContainer">
        {loading && !loadingFailed ? (
          <div className="loader">
            <Spinner name="wave" color="green" />
          </div>
        ) : null}

        {loadingFailed ? <a href={googleUrlPDF}>Download File</a> : null}
        {renderIframe()}
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default ScoreFrame;
