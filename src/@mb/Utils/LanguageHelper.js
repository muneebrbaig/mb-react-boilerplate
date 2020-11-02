import languageData from "./languageData";

class LanguageHelper {
  Language = {
    Urdu: "ur",
    English: "en",
    Arabic: "ar",
  };
  Direction = {
    Auto: "auto",
    LeftToRight: "ltr",
    RightToLeft: "rtl",
  };
  getLanguageData = (locale) =>
    !!locale ? languageData.find((l) => l.locale === locale) : languageData;

  getLangClass = (lang) => {
    switch (lang) {
      case this.Language.Urdu:
        return "urdu-font";
      case this.Language.Arabic:
        return "arabic-font";
      case this.Language.English:
      default:
        return "eng-font";
    }
  };
  getDirection = (lang) => {
    switch (lang) {
      case this.Direction.RightToLeft:
      case this.Language.Urdu:
      case this.Language.Arabic:
        return this.Direction.RightToLeft;
      case this.Direction.LeftToRight:
      case this.Language.English:
      default:
        return this.Direction.LeftToRight;
    }
  };
}
const instance = new LanguageHelper();

export default instance;
