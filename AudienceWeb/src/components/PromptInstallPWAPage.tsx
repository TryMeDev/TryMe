import React, { useState, useEffect } from "react";
import { PUBLISHER_URL } from "../config";
import { Message } from "primereact/message";

type Platform = "windows" | "mac" | "ios" | "android" | "unknown";

interface InstructionStep {
  en: string;
  zh: string;
}

interface Instruction {
  title: {
    en: string;
    zh: string;
  };
  steps: InstructionStep[];
}

const PromptInstallPWAPage: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    if (/Windows/.test(navigator.userAgent)) {
      setPlatform("windows");
    } else if (/Macintosh/.test(navigator.userAgent)) {
      setPlatform("mac");
    } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      setPlatform("ios");
    } else if (/Android/.test(navigator.userAgent)) {
      setPlatform("android");
    }
  }, []);

  const instructions: Record<Platform, Instruction> = {
    windows: {
      title: {
        en: "Install TryMe on Windows",
        zh: "在Windows上安裝TryMe",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: "Click on the install button at the right of the address bar",
          zh: "點擊網址列右面的下載按鈕",
        },
        {
          en: 'Click "Install" in the pop-up window',
          zh: '在彈出視窗中點擊"安裝"',
        },
      ],
    },
    mac: {
      title: {
        en: "Install TryMe on Mac",
        zh: "在Mac上安裝TryMe",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: 'Click on the "..." menu in the top-right corner',
          zh: '點擊右上角的"..."選單',
        },
        {
          en: 'Select "Install TryMe..." from the menu',
          zh: '選擇"安裝TryMe"',
        },
        {
          en: 'Click "Install" in the pop-up window',
          zh: '在彈出視窗中點擊"安裝"',
        },
      ],
    },
    ios: {
      title: {
        en: "Install TryMe on iOS",
        zh: "在iOS上安裝TryMe",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome",
          zh: "我們建議使用Google Chrome瀏覽這頁面",
        },
        { en: "Tap the Share button", zh: "點擊分享按鈕" },
        {
          en: 'Scroll down and tap "Add to Home Screen"',
          zh: '向下滾動並點擊"加到主畫面"',
        },
        { en: 'Tap "Add" in the top-right corner', zh: '點擊右上角的"加入"' },
      ],
    },
    android: {
      title: {
        en: "Install TryMe on Android",
        zh: "在Android上安裝TryMe",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome",
          zh: "我們建議使用Google Chrome瀏覽這頁面",
        },
        {
          en: 'Tap the "..." menu (if install button is not popped up)',
          zh: '點擊"..."選單 （如沒有彈出安裝提示）',
        },
        {
          en: 'Tap "Install app" or "Add to Home screen"',
          zh: '點擊"安裝應用程式"或"新增至主螢幕"',
        },
        {
          en: 'Tap "Install" or "Add" in the pop-up',
          zh: '在彈出視窗中點擊"安裝"或"新增"',
        },
      ],
    },
    unknown: {
      title: {
        en: "Installation Instructions",
        zh: "安裝說明",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: "Look for an 'Install' or 'Add to Home Screen' option in your browser's menu",
          zh: "在瀏覽器選單中尋找「安裝」或「加到主畫面」選項",
        },
        {
          en: "Follow the prompts to install the app",
          zh: "按照提示安裝應用程式",
        },
      ],
    },
  };
  const publisherLink = {
    zh: "創作者請按這裏",
    en: "Click here if you are a creator",
  };

  const currentInstructions = instructions[platform];
  const colors = {
    primary: "#8800ff",
    secondary: "#ffcc00",
    background: "#f8f8f8",
    text: "#333333",
    lightText: "#666666",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: colors.background }}
    >
      {/* <div className="absolute top-4 right-4">
        <Message
          text={
            <>
              Click here if it is installed already
              <br />
              請按這裏如果你已經下載了
            </>
          }
          className="cursor-pointer underline !max-w-[85vw]"
          onClick={() => {
            openPWA();
          }}
        />
      </div> */}

      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1
          className="text-4xl font-light text-center mb-8"
          style={{ color: colors.primary }}
        >
          <span className="block">{currentInstructions.title.en}</span>
          <span
            className="block mt-2 text-xl"
            style={{ color: colors.lightText }}
          >
            {currentInstructions.title.zh}
          </span>
        </h1>
        <ul className="space-y-6">
          <li>
            <div className="flex items-start">
              <span
                className="flex items-center justify-center text-white rounded-full w-8 h-8 mr-4 flex-shrink-0 text-sm font-bold"
                style={{ backgroundColor: colors.primary }}
              >
                {0}
              </span>
              <div>
                <a
                  href={`${PUBLISHER_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-lg mb-1 block"
                  style={{ color: colors.text }}
                >
                  {publisherLink.en}
                </a>
                <a
                  href={`${PUBLISHER_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-sm block"
                  style={{ color: colors.lightText }}
                >
                  {publisherLink.zh}
                </a>
              </div>
            </div>
          </li>

          {currentInstructions.steps.map((step, index) => (
            <li
              key={index}
              className="fade-in"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="flex items-start">
                <span
                  className="flex items-center justify-center text-white rounded-full w-8 h-8 mr-4 flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: colors.primary }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg mb-1" style={{ color: colors.text }}>
                    {step.en}
                  </p>
                  <p className="text-sm" style={{ color: colors.lightText }}>
                    {step.zh}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromptInstallPWAPage;
