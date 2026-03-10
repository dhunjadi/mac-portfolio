import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import WindowWrapper from "../WindowWrapper";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type PdfWindowProps = {
  onClose: () => void;
};

const PDF_FILE_PATH = `${import.meta.env.BASE_URL}resume.pdf`;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfWindow = ({ onClose }: PdfWindowProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.4));
  };

  return (
    <WindowWrapper windowId="pdf" onClose={onClose} disableResizing>
      <div className="w-pdfWindow">
        <div className="w-pdfWindow__viewer">
          {hasLoadError ? (
            <p className="w-pdfWindow__placeholder">Error loading PDF</p>
          ) : (
            <Document
              file={PDF_FILE_PATH}
              onLoadSuccess={({ numPages: loadedPages }) =>
                setNumPages(loadedPages)
              }
              onLoadError={() => setHasLoadError(true)}
              loading={
                <p className="w-pdfWindow__placeholder">
                  Loading PDF preview...
                </p>
              }
            >
              {Array.from(new Array(numPages ?? 0), (_, index) => (
                <Page
                  key={`pdf-page-${index + 1}`}
                  pageNumber={index + 1}
                  width={760}
                  scale={scale}
                />
              ))}
            </Document>
          )}
        </div>
        <div className="w-pdfWindow__buttons">
          <button
            className="w-pdfWindow__buttons_button"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button
            className="w-pdfWindow__buttons_button"
            onClick={handleZoomOut}
          >
            &#8722;
          </button>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default PdfWindow;
