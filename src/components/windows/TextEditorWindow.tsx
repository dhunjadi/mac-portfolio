import { useEffect, useState } from "react";
import WindowWrapper from "../WindowWrapper";

type TextEditorWindowProps = {
  onClose: () => void;
};

const SAMPLE_FILE_NAME = "sample.txt";
const SAMPLE_FILE_PATH = `${import.meta.env.BASE_URL}${SAMPLE_FILE_NAME}`;

const TextEditorWindow = ({ onClose }: TextEditorWindowProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

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

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = SAMPLE_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <WindowWrapper windowId="text-editor" onClose={onClose}>
      <div className="w-textEditor">
        <div className="w-textEditor__toolbar">
          <button className="w-textEditor__toolbar_button" type="button">
            Import
          </button>
          <button
            className="w-textEditor__toolbar_button w-textEditor__toolbar_button--primary"
            type="button"
            onClick={handleDownload}
            disabled={isLoading}
          >
            Download
          </button>
        </div>

        <div className="w-textEditor__content">
          {isLoading ? (
            <p className="w-textEditor__content_placeholder">
              Loading sample text...
            </p>
          ) : hasLoadError ? (
            <p className="w-textEditor__content_placeholder">
              Unable to load the sample file. You can still type below and
              download your edits.
            </p>
          ) : null}

          <textarea
            className="w-textEditor__content_textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-label="Text editor"
          />
        </div>
      </div>
    </WindowWrapper>
  );
};

export default TextEditorWindow;
