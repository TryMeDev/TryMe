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
            logout: "Logout",
          },
          home: {
            yourAds: "Your Advertisements",
            createAd: "Create Ad",
            noAds: "No Advertisements",
          },
          error: {
            title: "Ooops",
            message: "An unexpected error has occurred.",
            unknownError: "Unknown error",
          },
          detail: {
            postingDate: "Posting Date: {{date}}",
            link: "Link",
            locations: "Locations: {{locations}}",
            status: "Status: ",
            pay: "Pay",
            refund: "Refund",
            cancel: "Cancel",
            delete: "Delete",
            confirmPayment: "Are you sure you want to pay?",
            confirmPaymentHeader: "Confirm Payment",
            confirmRefund: "Are you sure you want to request for refund?",
            confirmRefundHeader: "Confirm Refund",
            confirmCancel:
              "Are you sure you want to cancel? (No Refund will be given to approved advertisment)",
            confirmCancelHeader: "Confirm Cancelation",
            confirmDelete: "Are you sure you want to delete?",
            deleteHeader: "Delete Advertisement",
            explosure: "Explosure: {{explosure}}",
            statusDescription: "Status Description: {{statusDescription}}",
            tags: "Tags: {{tags}}",
            is18: "It contains 18+ contents",
            isNot18: "It does not contain 18+ contents",
          },
          create: {
            steps: {
              uploadImages: "Upload Images",
              setLinks: "Set Links",
              setInformation: "Set Information",
            },
            setInfo: {
              locations: "Locations",
              startDate: "Start Date",
              endDate: "End Date",
              price: "Price",
              minimumCharge: "Minimum Charge is {{charge}}",
              back: "Back",
              next: "Next",
              timeConflict:
                "The time selected is conflicted with another advertisements, please change it",
              payment: "Payment",
            },
            setLinks: {
              title: "Please set the links",
              placeholder: "Enter a link",
              back: "Back",
              next: "Next",
            },
            uploadImages: {
              uploadError: "Upload Error",
              dragAndDrop: "Drag and Drop Image Here",
              choose: "Choose",
              next: "Next",
              aspectratio:
                "Please select image of size 1080*1920 (portrait), or the resulting image will be distorted",
            },
          },
          status: {
            unpaid: "Unpaid",
            paid: "Paid",
            approved: "Approved",
            rejected: "Rejected",
            canceled: "Canceled",
          },
        },
      },
      "zh-TW": {
        translation: {
          login: {
            failedSummary: "登入失敗",
            failedDetail: "請檢查電子郵件地址是否有效",
            logout: "登出",
          },
          home: {
            yourAds: "您的廣告",
            createAd: "建立廣告",
            noAds: "沒有廣告",
          },
          error: {
            title: "糟糕",
            message: "發生了意外錯誤。",
            unknownError: "未知錯誤",
          },
          detail: {
            postingDate: "刊登時間: {{date}}",
            link: "連結",
            locations: "地區: {{locations}}",
            status: "狀態：",
            pay: "付款",
            refund: "退款",
            cancel: "取消",
            delete: "刪除",
            confirmPayment: "您確定要付款嗎?",
            confirmPaymentHeader: "確認付款",
            confirmRefund: "您確定要申請退款嗎？",
            confirmRefundHeader: "退款確認",
            confirmCancel: "您確定要取消嗎?（已審核的廣告不會被退款）",
            confirmCancelHeader: "確認取消",
            confirmDelete: "您確定要刪除嗎?",
            deleteHeader: "刪除廣告",
            explosure: "曝光次數：{{explosure}}",
            statusDescription: "狀態描述：{{statusDescription}}",
            tags: "標簽：{{tags}}",
            is18: "含有18+内容",
            isNot18: "沒有含有18+内容",
          },
          create: {
            steps: {
              uploadImages: "上傳圖片",
              setLinks: "設定連結",
              setInformation: "設定資訊",
            },
            setInfo: {
              locations: "地區",
              startDate: "開始日期",
              endDate: "結束日期",
              price: "價格",
              minimumCharge: "最低收費為 {{charge}}",
              back: "返回",
              next: "下一步",
              timeConflict:
                "你選擇的時間與你選擇的其他廣告重疊了,請選擇其他時間",
              payment: "付款",
            },
            setLinks: {
              title: "請設定連結",
              placeholder: "輸入連結",
              back: "返回",
              next: "下一步",
            },
            uploadImages: {
              uploadError: "上傳錯誤",
              dragAndDrop: "拖曳圖片至此",
              choose: "選擇",
              next: "下一步",
              aspectratio: "請上載1080*1920竪屏的照片，否則有可能會變形",
            },
          },
          status: {
            unpaid: "未付款",
            paid: "已付款",
            approved: "已審核",
            rejected: "已被拒絕",
            canceled: "已取消",
          },
        },
      },
    },
  });

export default i18n;
