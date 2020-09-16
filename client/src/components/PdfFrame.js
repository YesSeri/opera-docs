import React from 'react'
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';


export default function PdfFrame() {
const downloadLink =  'https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/Famillia_agita_onesta-Gaetano_Donizetti.pdf'// `https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${filename}`;
  return (
    <embed style={{height:'98vh', width: '95vw'}} src={downloadLink}>
    </embed>
    // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
    //   <div style={{ height: '750px' }}>
    //     <Viewer fileUrl={downloadLink} />
    //   </div>
    // </Worker>
  );
}
