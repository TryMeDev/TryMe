import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: {
          share: { notFound: "Sorry, the advertisement may be removed" },
          error: {
            title: "Oops",
            message: "An unexpected error has occurred.",
            unknownError: "Unknown error",
          },
          home: {
            noRecommendations:
              "We're sorry, we couldn't provide any recommendations for you. Please change your preferences or wait for more ads to be published.",
            noSearchResult:
              "No search results found. Please change your searching tags, change your interested categories, or wait for more ads to be published.",
            getIdsError:
              "An error has occurred. Please ensure you are connected to the network and try reloading. If the issue persists, please try again later.",
          },
          settings: {
            settings: "Settings",
            is18: "I am 18 years old or above",
            isNot18: "I am not 18 years old",
            interestedCats:
              "Please uncheck the categories that you are not interested in",
          },
          search: {
            getTagsError:
              "An error has occurred. Please ensure you are connected to the network and try reloading. If the issue persists, please try again later.",
            search: "Search",
            hint: "Please enter the tags you want to search for",
          },
          bookmarks: {
            bookmarks: "My Bookmarks",
            deleteConfirmHeader: "Delete Confirmation",
            deleteConfirmMsg:
              "Are you sure you want to delete the selected bookmarks?",
          },
          getByIdError:
            "An error has occurred. Please ensure you are connected to the network and try reloading. If the issue persists, please try again later.",
          getCatsError:
            "An error has occurred. Please ensure you are connected to the network and try reloading. If the issue persists, please try again later.",
          language: "Language",
          location: "Location",
          copiedToClipboard: "Copied to clipboard",
          success: "Success",
        },
      },
      "zh-TW": {
        translation: {
          share: { notFound: "非常抱歉，連結的廣告可能已被移除" },
          error: {
            title: "糟糕",
            message: "發生了意外錯誤。",
            unknownError: "未知錯誤",
          },
          home: {
            noRecommendations:
              "很抱歉，我們未能給你推薦任何廣告，請更改你的喜好或等待廣告商投放更多廣告",
            noSearchResult:
              "沒有搜尋結果，請更改搜尋標簽，或更改不感興趣的類別，或等待廣告商投放更多廣告",
            getIdsError:
              "發生了錯誤。請確保你已連接網絡，然後重新載入。如問題持續，請稍後再試。",
          },
          settings: {
            settings: "設定",
            is18: "我已年滿18歲",
            isNot18: "我未年滿18歲",
            interestedCats: "請取消勾選你不感興趣的類別",
          },
          search: {
            getTagsError:
              "發生了錯誤。請確保你已連接網絡，然後重新載入。如問題持續，請稍後再試。",
            search: "搜尋",
            hint: "請輸入你要搜尋的標簽",
          },
          bookmarks: {
            bookmarks: "我的收藏",
            deleteConfirmHeader: "確認刪除",
            deleteConfirmMsg: "你是否確認要取消收藏已選擇的廣告？",
          },
          getByIdError:
            "發生了錯誤。請確保你已連接網絡，然後重新載入。如問題持續，請稍後再試。",
          getCatsError:
            "發生了錯誤。請確保你已連接網絡，然後重新載入。如問題持續，請稍後再試。",
          language: "語言",
          location: "地區",
          copiedToClipboard: "已複製到剪貼版",
          success: "成功",
        },
      },
    },
  });

export default i18n;
