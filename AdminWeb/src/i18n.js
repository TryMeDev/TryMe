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
          login: {
            failedSummary: "Login Fails",
            failedDetail: "Please check if the email address is valid",
          },
          error: {
            title: "Ooops",
            message: "An unexpected error has occurred.",
            unknownError: "Unknown error",
          },
          lang: {
            en: "English",
            "zh-TW": "Chinese (Traditional)",
          },
          add: "Add",
          searchPlaceholder: "Ad ID / Links",
          locations: "Locations: ",
          "Earlier Than": "Earlier Than: ",
          "Select Statuses": "Select Statuses",
          Search: "Search",
          postingDate: "Posting Date: {{startDate}} - {{endDate}}",
          link: "Link ",
          status: "Status: {{status}}",
          approve: "Approve",
          reject: "Reject",
          category: "Category: ",
          submit: "Submit",
          confirm: "Confirm to Update the Ad?",
          confirmHeader: "Update Confirmation",
          is18: "This content is 18+",
          tags: "Tags: ",
          statusDescription: "Status Remarks: ",
          categories: "Categories",
          logout: "Logout",
          adId: "Ad ID: {{adId}}",
        },
      },
      "zh-TW": {
        translation: {
          login: {
            failedSummary: "登入失敗",
            failedDetail: "請檢查電子郵件地址是否有效",
          },
          error: {
            title: "糟糕",
            message: "發生了意外錯誤。",
            unknownError: "未知錯誤",
          },
          lang: {
            en: "英文",
            "zh-TW": "中文 (繁體)",
          },
          add: "新增",
          searchPlaceholder: "廣告ID/鏈接",
          locations: "地區：",
          "Earlier Than": "早於：",
          "Select Statuses": "選擇狀態",
          Search: "搜尋",
          postingDate: "刊登日期: {{startDate}} - {{endDate}}",
          link: "連結 ",
          status: "狀態: {{status}}",
          approve: "批准",
          reject: "拒絕",
          category: "類別：",
          submit: "提交",
          confirm: "確認更新廣告？",
          confirmHeader: "更新確認",
          is18: "此内容需要18歲以上才能觀看",
          tags: "標簽：",
          statusDescription: "狀態備注：",
          categories: "類別",
          logout: "登出",
          adId: "廣告ID: {{adId}}",
        },
      },
    },
  });

export default i18n;
