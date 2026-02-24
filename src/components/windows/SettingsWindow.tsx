import { useState } from "react";
import WindowWrapper from "../WindowWrapper";
import userIcon from "/icons/user-icon.svg";
import { settingsCategories } from "../../data/settingsCategories";

type SettingsWindowProps = {
  onClose: () => void;
};

const SettingsWindow = ({ onClose }: SettingsWindowProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    settingsCategories[0]?.id ?? "",
  );

  const selectedCategory = settingsCategories.find(
    (category) => category.id === selectedCategoryId,
  );

  return (
    <WindowWrapper onClose={onClose}>
      <div className="w-settings">
        <div className="w-settings__sideBar">
          <div className="w-settings__sideBar_searchInput">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
            />
          </div>

          <div className="w-settings__sideBar_userInfo">
            <img src={userIcon} alt="user" />
            <div className="w-settings__sideBar_userInfo--text">
              <p>Sign in</p>
              <small>with your Apple ID</small>
            </div>
          </div>

          <ul className="w-settings__sideBar_categories">
            {settingsCategories.map((item) => (
              <li
                key={item.id}
                className={item.id === selectedCategoryId ? "active" : ""}
                onClick={() => setSelectedCategoryId(item.id)}
              >
                <img src={item.icon} alt="item icon" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-settings__content">
          <h1>{selectedCategory?.label}</h1>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default SettingsWindow;
