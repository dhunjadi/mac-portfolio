import { useDockPosition, useSettingsActions } from "../stores/settingsStore";

const DockPanel = () => {
  const dockPosition = useDockPosition();
  const { setDockPosition } = useSettingsActions();

  return (
    <section className="c-dockPanel">
      <h2 className="c-dockPanel__title">Dock</h2>
      <p className="c-dockPanel__subTitle">Change dock settings</p>

      <div className="c-dockPanel__input">
        <label htmlFor="dock-position">Position</label>
        <select
          id="dock-position"
          value={dockPosition}
          onChange={(event) =>
            setDockPosition(event.target.value as "left" | "bottom" | "right")
          }
        >
          <option value="left">Left</option>
          <option value="bottom">Bottom</option>
          <option value="right">Right</option>
        </select>
      </div>
    </section>
  );
};

export default DockPanel;
