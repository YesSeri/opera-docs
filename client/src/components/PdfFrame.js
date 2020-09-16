import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

export default function PdfFrame({ filename }) {
  const downloadLink = `https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`; // `https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`;
  const frameStyles ={height:'100vh', width: '100vw'} 
  return (
    <>

    <object style={frameStyles} data={downloadLink}>
    <embed style={frameStyles} src={downloadLink}>
    </embed>
</object>
    </>
    // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
    //   <div style={{ height: '100vh' }}>
    //     <Viewer fileUrl={downloadLink} />
    //   </div>
    // </Worker>
  );
}
