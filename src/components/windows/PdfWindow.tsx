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

  return (
    <WindowWrapper onClose={onClose} className="w-pdfWindow" disableResizing>
      <div className="w-pdfWindow__content">
        {hasLoadError ? (
          <p className="w-pdfWindow__placeholder">
            Add your PDF to `public/resume.pdf` and reopen this window.
          </p>
        ) : (
          <Document
            file={PDF_FILE_PATH}
            onLoadSuccess={({ numPages: loadedPages }) =>
              setNumPages(loadedPages)
            }
            onLoadError={() => setHasLoadError(true)}
            loading={
              <p className="w-pdfWindow__placeholder">Loading PDF preview...</p>
            }
          >
            {Array.from(new Array(numPages ?? 0), (_, index) => (
              <Page
                key={`pdf-page-${index + 1}`}
                pageNumber={index + 1}
                width={760}
              />
            ))}
          </Document>
        )}
      </div>
    </WindowWrapper>
  );
};

export default PdfWindow;
