import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import WindowWrapper from "../WindowWrapper";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useTranslation } from "react-i18next";

type PdfWindowProps = {
  onClose: () => void;
};

const PDF_FILE_PATH = `${import.meta.env.BASE_URL}resume.pdf`;

const PdfWindow = ({ onClose }: PdfWindowProps) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }, []);

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
            <p className="w-pdfWindow__placeholder">
              {t("windows.pdf.error")}
            </p>
          ) : (
            <Document
              file={PDF_FILE_PATH}
              onLoadSuccess={({ numPages: loadedPages }) =>
                setNumPages(loadedPages)
              }
              onLoadError={() => setHasLoadError(true)}
              loading={
                <p className="w-pdfWindow__placeholder">
                  {t("windows.pdf.loading")}
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
            aria-label={t("windows.pdf.zoomInLabel")}
          >
            +
          </button>
          <button
            className="w-pdfWindow__buttons_button"
            onClick={handleZoomOut}
            aria-label={t("windows.pdf.zoomOutLabel")}
          >
            &#8722;
          </button>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default PdfWindow;
