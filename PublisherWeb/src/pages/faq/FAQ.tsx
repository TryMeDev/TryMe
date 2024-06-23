import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import FAQContent from "./FAQContent";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />
      <div className="flex-1 flex flex-col p-4">
        <FAQContent />
      </div>
    </div>
  );
};

export default FAQ;
