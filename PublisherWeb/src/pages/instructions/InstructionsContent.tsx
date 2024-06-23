import { useTranslation } from "react-i18next";

const InstructionsContent = () => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default InstructionsContent;
