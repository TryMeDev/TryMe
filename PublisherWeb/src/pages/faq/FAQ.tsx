import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import { Accordion, AccordionTab } from "primereact/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />
      <div className="flex-1 flex flex-col p-4">
        <Accordion activeIndex={-1}>
          <AccordionTab header={t("faq.q1")}>
            <p className="m-0">{t("faq.a1")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q2")}>
            <p className="m-0">{t("faq.a2")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q3")}>
            <p className="m-0">{t("faq.a3")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q4")}>
            <p className="m-0">{t("faq.a4")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q5")}>
            <p className="m-0">{t("faq.a5")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q6")}>
            <p className="m-0">{t("faq.a6")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q7")}>
            <p className="m-0">{t("faq.a7")}</p>
          </AccordionTab>
          <AccordionTab header={t("faq.q8")}>
            <p className="m-0">{t("faq.a8")}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
