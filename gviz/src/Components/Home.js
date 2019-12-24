import React from 'react';
import { useDropzone } from 'react-dropzone';
import FileDropper from './FileDropper';
import FileDropperVanilla from './FileDropperVanilla'
import "./Styles/Home.css";

export default function Home() {
    return (
        <div className="container">
            <div className="parent">
                <div className="introHeader">
                    How to use GViz
                </div>
                <div className="introInstruction">
                    Welcome to GViz, an interactive genomic overlap visualizer for use in analyzing overlaps present in BED files.
                    To start, simply drag and drop a ZIP file containing all BED files.
                </div>
                <div className="fileUploadZone">
                    <FileDropperVanilla></FileDropperVanilla>
                </div>
            </div>
        </div>
    )
}
