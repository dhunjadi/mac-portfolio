import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  useSettingsActions,
  useShow24HourTime,
} from "../../../../stores/settingsStore";

const DateAndTimePanel = () => {
  const { t } = useTranslation();
  const show24HourTime = useShow24HourTime();
  const { setShow24HourTime } = useSettingsActions();
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const updateNow = () => setNow(dayjs());
    updateNow();

    const intervalId = window.setInterval(updateNow, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const dateTimeLabel = show24HourTime
    ? now.format("DD.MM.YYYY., HH:mm:ss")
    : now.format("DD.MM.YYYY., h:mm:ss A");

  return (
    <section className="c-dateAndTimePanel">
      <div className="c-dateAndTimePanel__group">
        <div className="c-dateAndTimePanel__group_row">
          <span>
            {t("windows.settings.categories.dateAndTime.dateAndTimeLabel")}
          </span>
          <span className="c-dateAndTimePanel__row_value">{dateTimeLabel}</span>
        </div>

        <div className="c-dateAndTimePanel__group_row">
          <span>{t("windows.settings.categories.dateAndTime.show24Hour")}</span>
          <label className="c-dateAndTimePanel__toggle">
            <input
              type="checkbox"
              checked={show24HourTime}
              onChange={(event) => setShow24HourTime(event.target.checked)}
              aria-label={t(
                "windows.settings.categories.dateAndTime.show24Hour",
              )}
            />
            <span aria-hidden="true" />
          </label>
        </div>
      </div>
    </section>
  );
};

export default DateAndTimePanel;
