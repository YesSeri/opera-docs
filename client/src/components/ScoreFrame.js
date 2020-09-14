import React, { useState, useEffect } from 'react';
import './css/scoreFrame.css';

function ScoreFrame(props) {
  const [loading, setLoading] = useState(true);
  const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${props.filename}`;
  let timer = null;

  useEffect(() => {
    timer = setInterval(() => {
      reloadIframe();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const reloadIframe = () => {
    var iframe = document.getElementById('myIframe');
    iframe.src = iframe.src;
  };
  const handleLoad = () => {
    setLoading(false);
    clearInterval(timer);
  };

  const renderIframe = () => {
    return (
      <div className="iframeContainer">
        <iframe
          style={{ visibility: loading ? 'hidden' : 'visible' }}
          id="myIframe"
          src={googleUrlPDF}
          title="embededPDF"
          onLoad={handleLoad}
        />
      </div>
    );
  };
  return (
    <div className="container">
      <div className="innerContainer">
        {loading ? <a href={googleUrlPDF}>Download File</a> : null}
        {renderIframe()}
      </div>
    </div>
  );
}

export default ScoreFrame;
