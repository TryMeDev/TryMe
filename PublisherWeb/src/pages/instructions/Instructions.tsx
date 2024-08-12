import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import BottomBar from "../../components/BottomBar";

const Instructions = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />

      <div className="flex-1 flex flex-col p-4 h-[calc(100%-59px)] overflow-auto">
        <h1 className="text-3xl">{t("instructions.heading")}</h1>
        <p>{t("instructions.paragraph1")}</p>
        <h2 className="text-2xl mt-3">{t("instructions.heading2")}</h2>
        <ol>{t("instructions.paragraph2Point1")}</ol>
        <ol>{t("instructions.paragraph2Point2")}</ol>
        <ol>{t("instructions.paragraph2Point3")}</ol>
        <ol>{t("instructions.paragraph2Point4")}</ol>
        <h2 className="text-2xl mt-3">{t("instructions.heading3")}</h2>
        <ol>{t("instructions.paragraph3Point1")}</ol>
        <ol>{t("instructions.paragraph3Point2")}</ol>
        <h2 className="text-2xl mt-3">{t("instructions.heading4")}</h2>
        <ol>{t("instructions.paragraph4Point1")}</ol>
        <ol>{t("instructions.paragraph4Point2")}</ol>
        <ol>{t("instructions.paragraph4Point3")}</ol>
        <p>{t("instructions.paragraph5")}</p>

        <BottomBar />
      </div>
    </div>
  );
};

export default Instructions;
