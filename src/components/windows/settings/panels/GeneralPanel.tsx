import { useSettingsActions } from "../../../../stores/settingsStore";
import ChevronRight from "../../../../assets/icons/chevron-right.svg?react";

const GeneralPanel = () => {
  const { setActivePanel } = useSettingsActions();

  return (
    <div className="c-generalPanel">
      <div className="c-generalPanel__group">
        <button
          className="c-generalPanel__group_button"
          onClick={() => setActivePanel("language")}
        >
          <span>Language & Region</span>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>
      </div>
    </div>
  );
};

export default GeneralPanel;
