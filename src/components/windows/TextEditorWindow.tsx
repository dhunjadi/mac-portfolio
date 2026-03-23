import { useEffect, useRef, useState, type ChangeEvent } from "react";
import WindowWrapper from "../WindowWrapper";
import { useTranslation } from "react-i18next";

type TextEditorWindowProps = {
  onClose: () => void;
};

const SAMPLE_FILE_NAME = "sample.txt";
const SAMPLE_FILE_PATH = `${import.meta.env.BASE_URL}${SAMPLE_FILE_NAME}`;

const TextEditorWindow = ({ onClose }: TextEditorWindowProps) => {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState(SAMPLE_FILE_NAME);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isActive = true;
    const loadSample = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SAMPLE_FILE_PATH);
        if (!response.ok) throw new Error("Sample file fetch failed");
        const text = await response.text();
        if (!isActive) return;
        setContent(text);
        setFileName(SAMPLE_FILE_NAME);
        setHasLoadError(false);
      } catch {
        if (!isActive) return;
        setHasLoadError(true);
        setContent("");
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadSample();

    return () => {
      isActive = false;
    };
  }, []);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setContent(text);
      setFileName(file.name);
      setHasLoadError(false);
    } catch {
      setHasLoadError(true);
    } finally {
      event.target.value = "";
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || SAMPLE_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <WindowWrapper windowId="text-editor" onClose={onClose}>
      <div className="w-textEditor">
        <div className="w-textEditor__toolbar">
          <button
            className="w-textEditor__toolbar_button"
            type="button"
            onClick={handleImportClick}
            disabled={isLoading}
          >
            {t("windows.textEditor.import")}
          </button>
          <button
            className="w-textEditor__toolbar_button w-textEditor__toolbar_button--primary"
            type="button"
            onClick={handleDownload}
            disabled={isLoading}
          >
            {t("windows.textEditor.download")}
          </button>
        </div>

        <div className="w-textEditor__content">
          {isLoading ? (
            <p className="w-textEditor__content_placeholder">
              {t("windows.textEditor.loading")}
            </p>
          ) : hasLoadError ? (
            <p className="w-textEditor__content_placeholder">
              {t("windows.textEditor.error")}
            </p>
          ) : null}

          <textarea
            className="w-textEditor__content_textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-label={t("windows.textEditor.editorLabel")}
          />
          <input
            ref={fileInputRef}
            className="w-textEditor__content_fileInput"
            type="file"
            accept=".txt,text/plain"
            onChange={handleImportChange}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </div>
    </WindowWrapper>
  );
};

export default TextEditorWindow;
