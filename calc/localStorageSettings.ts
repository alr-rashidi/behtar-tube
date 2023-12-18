export const getLocalStorageSetting = (key: string) => {
  let settings = localStorage.getItem("settings");
  if (settings) {
    let settingsObj = JSON.parse(settings);
    return settingsObj[key];
  } else {
    return null;
  }
};

export const setLocalStorageSetting = (key: string, value: string) => {
  let settings = localStorage.getItem("settings");
  if (!settings) {
    settings = '{}';
  }
  let settingsObj = JSON.parse(settings);
  settingsObj[key] = value;
  localStorage.setItem('settings', JSON.stringify(settingsObj));
};
