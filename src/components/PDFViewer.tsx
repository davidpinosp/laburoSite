import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import DownloadIcon from "@mui/icons-material/Download";

// Set the correct workerSrc to the CDN link
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFViewerProps {
  path: string;
  name: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ path, name }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: any) => {
    setError(
      "Hubo un problema cargando el PDF. Por favor, descárguelo o intente nuevamente."
    );
    setLoading(false);
  };

  const handlePrevious = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handleDownload = () => {
    fetch(path)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name + "_CV"; // Here is the filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  useEffect(() => {
    setPageNumber(1);
  }, [path]);

  return (
    <div className="pdf-viewer">
      {path ? (
        <div className="w100">
          <Document
            file={path}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            {loading && <p>Cargando...</p>}
            {!loading && !error && (
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            )}
          </Document>
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <div>
              <div className="navigation flx-center">
                <button onClick={handlePrevious} disabled={pageNumber <= 1}>
                  Previous
                </button>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                <button onClick={handleNext} disabled={pageNumber >= numPages}>
                  Next
                </button>
              </div>
            </div>
          )}
          <div className="w100 flx mt-25" style={{ justifyContent: "right" }}>
            <button onClick={handleDownload} className="download-btn">
              <DownloadIcon /> Descargar CV
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
