import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import { CUSTOMER_URL } from "../../config";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-3xl">{t("aboutUs.heading")}</h1>
        <p>{t("aboutUs.paragraph1")}</p>
        <h2 className="text-2xl mt-3">{t("aboutUs.heading2")}</h2>
        <p>{t("aboutUs.paragraph2")}</p>
        <h2 className="text-2xl mt-3">{t("aboutUs.heading3")}</h2>
        <ol>{t("aboutUs.paragraph3Point1")}</ol>
        <ol>{t("aboutUs.paragraph3Point2")}</ol>
        <ol>{t("aboutUs.paragraph3Point3")}</ol>
        <ol>{t("aboutUs.paragraph3Point4")}</ol>
        <ol>{t("aboutUs.paragraph3Point5")}</ol>
        <ol>{t("aboutUs.paragraph3Point6")}</ol>
        <h2 className="text-2xl mt-3">{t("aboutUs.heading4")}</h2>
        <ol>{t("aboutUs.paragraph4Point1")}</ol>
        <ol>{t("aboutUs.paragraph4Point2")}</ol>
        <h2 className="text-2xl mt-3">{t("aboutUs.heading5")}</h2>
        <p>{t("aboutUs.paragraph5")}</p>
        <p>{t("aboutUs.paragraph5Email")}</p>

        <a className="underline" href={CUSTOMER_URL}>
          {t("browse")}
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
