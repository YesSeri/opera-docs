import React, { useState, useEffect } from 'react';
import {StyledIframe} from './css/styComp';
import {useInterval} from './helper/HelperFunctions';

function ScoreFrame({ filename }) {
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [time, setTime] = useState(4000);
  // const googleUrlPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`;
  const downloadLink= `https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`

  useEffect(() => {
    // I need to try and reload the page because google viewer doesnt always render as it should. If the iframe loads, then I stop the attempts to rerender.
    if (time && loadAttempts > 4) {
      setLoadingFailed(true);
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
      <StyledIframe>
        <div style={{margin: 'auto'}}>
        <iframe
          style={{
            visibility: loading && !loadingFailed ? 'hidden' : 'visible',
          }}
          id="myIframe"
          src={downloadLink}
          title="title"
          onLoad={handleLoad}
        />
        </div>
      </StyledIframe>
    );
  };
  return (
    <>
        {/* {loading && !loadingFailed ? (
          <Spinner name="wave" color="green" />
        ) : null} */}
        {renderIframe()}
        {loadAttempts > 2 ? <a href={downloadLink}>Download File</a> : null}
    </>
  );
}

export default ScoreFrame;
