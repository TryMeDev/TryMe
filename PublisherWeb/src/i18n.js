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
          browse: "I wanna browse for posts",
          privacyPolicy: "Privacy Policy",
          termsOfService: "Terms of Service",
          login: {
            iamcustomer: "I wanna browse post",
            iampublisher: "I wanna post post",
            customerlink: "Please download the customer app here",
            failedSummary: "Login Fails",
            failedDetail: "Please check if the email address is valid",
            logout: "Logout",
            hint: "Some Google Chrome plugins may interfere the login process. Please try to disable them if you can't login.",
            heading: "Breaking the Recommendation Algorithm",
            subHeading:
              "Providing Equal Exposure for Small Businesses, Bringing Free Exploration to Users",
            page2Heading: "Fair Competition",
            page2Content:
              "TryMe abandons traditional recommendation systems, offering equal display opportunities for all merchants. Regardless of size, every merchant can receive deserved exposure",
            page3Heading: "Creative Freedom",
            page3Content:
              "We encourage merchants to freely express their creativity without sacrificing content uniqueness and diversity to cater to algorithms",
            page4Heading: "Breaking Information Bubbles",
            page4Content:
              "Users can access a wider range of content, broadening their horizons and enhancing understanding of different perspectives",
            page5Heading: "Privacy Protection",
            page5Content:
              "We don't collect personal data for content recommendations, fully respecting users' privacy rights",
          },
          home: {
            yourAds: "Your Posts",
            createAd: "Create Post",
            noAds: "No Posts",
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
              "Are you sure you want to cancel? (No Refund will be given to approved post)",
            confirmCancelHeader: "Confirm Cancelation",
            confirmDelete: "Are you sure you want to delete?",
            deleteHeader: "Delete Post",
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
              cat: "Category",
              tags: "Tags (Press Enter or , to add)",
              locations: "Locations",
              startDate: "Start Date",
              endDate: "End Date",
              price: "Price",
              minimumCharge: "Minimum Charge is {{charge}}",
              back: "Back",
              next: "Next",
              timeConflict:
                "The time selected is overlapped with another posts, please change it",
              payment: "Payment",
              read: "I have read and agreed the ",
              instructions: "user instructions",
              and: " and ",
              faq: "FAQ",
            },
            setLinks: {
              title:
                "Please set the links (user will be redirected to the link after clicking the images)",
              placeholder: "https://www.example.com",
              back: "Back",
              next: "Next",
            },
            uploadImages: {
              uploadError: "Upload Error",
              dragAndDrop: "Drag and Drop Image Here",
              choose: "Choose",
              next: "Next",
              aspectratio:
                "Please select image of size 1080*1920 (portrait) in jpg/png, or the resulting image will be distorted",
            },
            payError: "Payment fail. Please try later.",
          },
          status: {
            unpaid: "Unpaid",
            paid: "Paid",
            approved: "Approved",
            rejected: "Rejected",
            canceled: "Canceled",
          },
          aboutUs: {
            aboutUs: "About Us",
            heading: "About TryMe",
            paragraph1:
              "TryMe is an innovative online platform dedicated to providing fair exposure opportunities for small businesses and independent creators, while offering users a more diverse content experience.",
            heading2: "Our Mission",
            paragraph2:
              "In today's digital age, recommendation algorithms of large platforms dominate information dissemination and reception. While these algorithms can provide personalized content, they also bring many issues. TryMe was born to address these problems and create a more open, fair, and diverse online environment.",
            heading3: "Our Features",
            paragraph3Point1:
              "Fair Competition: TryMe abandons traditional recommendation systems, offering equal display opportunities for all merchants. Regardless of size, every merchant can receive deserved exposure.",
            paragraph3Point2:
              "Creative Freedom: We encourage merchants to freely express their creativity without sacrificing content uniqueness and diversity to cater to algorithms.",
            paragraph3Point3:
              "Breaking Information Bubbles: Users can access a wider range of content, broadening their horizons and enhancing understanding of different perspectives.",
            paragraph3Point4:
              "Privacy Protection: We don't collect personal data for content recommendations, fully respecting users' privacy rights.",
            paragraph3Point5:
              "Value-Oriented: TryMe focuses on the substantial value of content rather than merely pursuing click rates and eye-catching effects.",
            paragraph3Point6:
              "Encouraging Active Exploration: We provide users with space for autonomous choices, encouraging them to actively discover content of interest.",
            heading4: "Why Choose TryMe?",
            paragraph4Point1:
              "For Merchants (Content Creators): TryMe offers you a fair competitive environment, allowing your unique value to be fully displayed. Without worrying about being suppressed by large competitors, you can focus on creating quality content and attracting genuinely interested customers.",
            paragraph4Point2:
              "For Users (Explorers): On TryMe, you can break free from algorithmic constraints and freely explore diverse content. Discover new interests, encounter different viewpoints, and enjoy true information freedom.",
            heading5: "Contact Us",
            paragraph5:
              "If you have any questions or suggestions about our products and services, please feel free to contact us.",
            paragraph5Email: "Email Address: contacttrymenow@gmail.com",
          },
          instructions: {
            instructions: "instructions",
            heading: "Guidelines for Content Creators",
            paragraph1:
              "Welcome to TryMe! To ensure you can fully enjoy our services, please read the following guidelines carefully. Adhering to these rules will help maintain a safe and orderly online environment.",
            heading2: "Content Publishing Standards",
            paragraph2Point1:
              "Strictly prohibited from publishing any illegal, violent, hateful, pornographic, or inappropriate content.",
            paragraph2Point2:
              "Respect others' intellectual property rights; piracy and copyright infringement are forbidden.",
            paragraph2Point3:
              "Please comply with relevant laws, regulations, and ethical standards when publishing content.",
            paragraph2Point4:
              "To maintain a positive online atmosphere on TryMe, we reserve the right to refuse uploading or remove posts uploaded by content creators.",
            heading3: "Privacy and Data Protection",
            paragraph3Point1:
              "We respect and protect your privacy rights; your personal data will be kept strictly confidential.",
            paragraph3Point2:
              "Please refer to our privacy policy for more details.",
            heading4: "Other Regulations",
            paragraph4Point1:
              "Unauthorized operations on the website system are strictly prohibited.",
            paragraph4Point2:
              "Do not abuse website functions or resources in ways that affect other users' normal usage.",
            paragraph4Point3:
              "We reserve the right to modify these guidelines and will notify users in due course.",
            paragraph5:
              "Thank you for your cooperation and understanding. If you have any questions or suggestions, please feel free to contact us. We hope you enjoy using TryMe!",
          },
          faq: {
            faq: "FAQ",
            q1: "Without a recommendation algorithm, why do different posts have different exposure rates?",
            a1: "The exposure of posts is related to their category and age rating. For example, if a post is classified as 18+, TryMe won't show it to users under 18, reducing its exposure. The same applies to categories and tags. If many users set certain categories as uninteresting or search for other tags, TryMe won't show them these posts.",
            q2: "Why do creators need to submit posts two days in advance?",
            a2: "This time is needed for TryMe staff to review the content.",
            q3: "Why can't creators submit multiple posts at the same time?",
            a3: "TryMe's philosophy is to provide relatively equal exposure opportunities for all creators. Allowing multiple submissions would enable some creators to dominate exposure by investing large amounts of money. Therefore, TryMe has implemented this restriction.",
            q4: "How is the fee for submitting posts calculated?",
            a4: "Basic price = Number of regions for post publication * Number of days for publication (in USD). Discounts are available with coupons.",
            q5: "Isn't it unfair that regions with different populations are charged the same?",
            a5: "Generally, regions with smaller populations also have fewer posts. This means the exposure potential across regions doesn't vary significantly, hence our uniform pricing. We apologize if this pricing structure doesn't meet everyone's expectations.",
            q6: "Why do you need to charge and set a minimum spend?",
            a6: "As we don't have other revenue streams, we must charge fees and set a minimum spend to cover review, platform operation, and development costs. However, we believe that once TryMe reaches a certain scale, posting on TryMe will offer better value for money than advertising on other platforms.",
            q7: "How do I use a coupon?",
            a7: "After filling in your details and proceeding to payment, you can enter the coupon code.",
            q8: "Can I cancel a post after submission?",
            a8: "Yes. You can cancel a post by logging in and selecting the post you want to cancel on the main page. If the status is paid or unpaid, you can get a refund for cancellation. Otherwise, cancelling a post will not result in a refund.",
            q9: "Why my post is rejected",
            a9: "TryMe has the right to reject the submitted post to maintain a good internet environment. Full refund will be given if the post is rejected.",
          },
        },
      },
      "zh-TW": {
        translation: {
          browse: "我想瀏覽帖子",
          privacyPolicy: "隱私權政策",
          termsOfService: "條款及細則",
          login: {
            iamcustomer: "我想瀏覽帖子",
            iampublisher: "我想發佈帖子",
            customerlink: "請移步下載顧客APP",
            failedSummary: "登入失敗",
            failedDetail: "請檢查電子郵件地址是否有效",
            logout: "登出",
            hint: "Google Chrome的某些擴充功能會導致無法登錄，如你無法登錄請嘗試停用它們",
            heading: "打破推薦算法",
            subHeading: "為商戶提供平等曝光，為用戶帶來自由探索",
            page2Heading: "公平競爭",
            page2Content:
              "TryMe摒棄了傳統的推薦系統,為所有商戶提供平等的展示機會。無論規模大小,每個商戶都能獲得應有的曝光",
            page3Heading: "創意自由",
            page3Content:
              "我們鼓勵商戶自由發揮創意,不必為迎合算法而犧牲內容的獨特性和多樣性",
            page4Heading: "打破信息茧房",
            page4Content:
              "用戶可以接觸到更廣泛的內容,擴展視野,增進對不同觀點的了解",
            page5Heading: "保護隱私",
            page5Content:
              "我們不收集用戶的個人數據來進行內容推薦,充分尊重用戶的隱私權",
          },
          home: {
            yourAds: "您的帖子",
            createAd: "建立帖子",
            noAds: "沒有帖子",
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
            confirmCancel: "您確定要取消嗎?（已審核的帖子不會被退款）",
            confirmCancelHeader: "確認取消",
            confirmDelete: "您確定要刪除嗎?",
            deleteHeader: "刪除帖子",
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
              cat: "類別",
              tags: "標簽（按Enter添加））",
              locations: "地區",
              startDate: "開始日期",
              endDate: "結束日期",
              price: "價格",
              minimumCharge: "最低收費為 {{charge}}",
              back: "返回",
              next: "下一步",
              timeConflict:
                "你選擇的時間與你選擇的其他帖子重疊了,請選擇其他時間",
              payment: "付款",
              read: "我已閲讀並同意",
              instructions: "用戶須知",
              and: "和",
              faq: "FAQ",
            },
            setLinks: {
              title: "請設定連結（用戶點擊圖片後會被帶到連結中）",
              placeholder: "https://www.example.com",
              back: "返回",
              next: "下一步",
            },
            uploadImages: {
              uploadError: "上傳錯誤",
              dragAndDrop: "拖曳圖片至此",
              choose: "選擇",
              next: "下一步",
              aspectratio:
                "請上載1080*1920竪屏且格式為jpg/png的照片，否則有可能會變形",
            },
            payError: "付款失敗，請稍後再嘗試",
          },
          status: {
            unpaid: "未付款",
            paid: "已付款",
            approved: "已審核",
            rejected: "已被拒絕",
            canceled: "已取消",
          },
          aboutUs: {
            aboutUs: "關於我們",
            heading: "關於TryMe",
            paragraph1:
              "TryMe是一個創新的網絡平台,致力於為小型商戶和獨立創作者提供公平的曝光機會,同時為用戶帶來更多元化的內容體驗。",
            heading2: "我們的使命",
            paragraph2:
              "在當今的數字時代,大型平台的推薦算法主導了信息的傳播和接收。雖然這些算法能夠提供個性化的內容,但也帶來了諸多問題。TryMe的誕生就是為了解決這些問題,創造一個更加開放、公平和多樣的網絡環境。",
            heading3: "我們的特色",
            paragraph3Point1:
              "公平競爭:TryMe摒棄了傳統的推薦系統,為所有商戶提供平等的展示機會。無論規模大小,每個商戶都能獲得應有的曝光。",
            paragraph3Point2:
              "創意自由:我們鼓勵商戶自由發揮創意,不必為迎合算法而犧牲內容的獨特性和多樣性。",
            paragraph3Point3:
              "打破信息茧房:用戶可以接觸到更廣泛的內容,擴展視野,增進對不同觀點的了解。",
            paragraph3Point4:
              "保護隱私:我們不收集用戶的個人數據來進行內容推薦,充分尊重用戶的隱私權。",
            paragraph3Point5:
              "價值導向:TryMe注重內容的實質價值,而非單純追求點擊率和吸睛效果。",
            paragraph3Point6:
              "鼓勵主動探索:我們為用戶提供自主選擇的空間,鼓勵他們主動發現感興趣的內容。",
            heading4: "為什麼選擇TryMe?",
            paragraph4Point1:
              "對於商戶（内容創作者）:TryMe為您提供公平的競爭環境,讓您的獨特價值得到充分展現。無需擔心被大型競爭對手壓制,您可以專注於創造優質內容,吸引真正感興趣的客戶。",
            paragraph4Point2:
              "對於用戶（探索者）:在TryMe,您可以擺脫算法的束縛,自由探索多樣化的內容。發現新的興趣,接觸不同的觀點,享受真正的信息自由。",
            heading5: "聯繫我們",
            paragraph5:
              "如果你對我們的產品和服務有任何疑問或建議,請隨時與我們聯繫。",
            paragraph5Email: "電郵地址：contacttrymenow@gmail.com",
          },
          instructions: {
            instructions: "用戶須知",
            heading: "内容創作者須知",
            paragraph1:
              "歡迎使用TryMe!為了確保您能夠充分享受我們提供的服務,請仔細閱讀以下須知。遵守這些規則將有助於維護一個安全、有序的在線環境。",
            heading2: "內容發佈規範",
            paragraph2Point1: "嚴禁發佈任何違法、暴力、仇恨、色情等不當內容。",
            paragraph2Point2: "尊重他人的知識產權,禁止盜版和侵權行為。",
            paragraph2Point3: "發佈內容時請遵守相關法律法規和道德規範。",
            paragraph2Point4:
              "為維持TryMe良好的網絡氣氛，TryMe有權拒絕上載或下架内容創作者上傳的帖子",
            heading3: "隱私和數據保護",
            paragraph3Point1:
              "我們尊重並保護您的隱私權,您的個人數據將受到嚴格保密。",
            paragraph3Point2: "請查閱我們的隱私政策以了解更多詳情。",
            heading4: "其他規定",
            paragraph4Point1: "嚴禁對網站系統進行任何未經授權的操作。",
            paragraph4Point2: "不得濫用網站功能或資源,影響其他用戶的正常使用。",
            paragraph4Point3: "我們保留修改本須知的權利,並將適時通知用戶。",
            paragraph5:
              "感謝您的配合與理解。如有任何疑問或建議,歡迎與我們聯繫。祝您使用愉快!",
          },
          faq: {
            faq: "FAQ",
            q1: "沒有推薦算法，爲什麽不同帖子的曝光次數會不同？",
            a1: "帖子的曝光次數與帖子的類別和年齡分級是相關的，例如如果帖子被分爲18歲以上才能觀看的話，TryMe就不會給未滿18歲的人看到，曝光次數就會減少。類別和標簽也一樣，如果很多用戶設定了不感興趣的類別，或是搜尋其他標簽，TryMe就不會給他們看到這些帖子。",
            q2: "爲何創作者需要提前兩天提交帖子？",
            a2: "因爲需要預留時間給TryMe的工作人員審核",
            q3: "爲何不可以在同一時間提交多個帖子？",
            a3: "TryMe的理念是讓每個創作者都有較爲同樣的曝光機會。如果允許創作者提交多個帖子，某些創作者就能透過投放大量金錢，霸占大部分的曝光機會。因此TryMe作出了這個限制。",
            q4: "提交帖子的收費如何計算？",
            a4: "基本價格=帖子發佈的地區數量*帖子發佈的天數（$USD）。如有優惠券，可以獲得更多優惠",
            q5: "不同地區的人數不一，收費卻一樣，豈不是很不公平?",
            a5: "一般而言，人數少的地區帖子的數量也會較少。換言之每個地區可獲得的曝光數量並不會有太大差距，因此我們會有統一收費。很抱歉如收費未能讓大家滿意。",
            q6: "爲何我們需要收費並設置最低消費？",
            a6: "由於我們沒有其他營利渠道，爲了覆蓋審核、平臺營運和開發成本，我們必須收費並設置最低消費。不過我們相信在TryMe發展到一定規模後，在TryMe發佈帖子，一定會比在其他平臺打廣告更有性價比的。",
            q7: "如何使用優惠券？",
            a7: "填好資料後按付款，就可以輸入優惠碼。",
            q8: "提交帖子後可不可以取消?",
            a8: "可以。如果只要登錄後到主頁選擇要取消的帖子就可以取消。如果狀態為未審核或未付款的話，取消帖子可以獲得退款，否則取消帖子並不會被退款。",
            q9: "爲什麽我的帖子被拒絕上架",
            a9: "爲了維護良好的網絡環境，TryMe有權拒絕任何帖子上架，被拒絕的帖子的相關款項會被退還",
          },
        },
      },
    },
  });

export default i18n;
