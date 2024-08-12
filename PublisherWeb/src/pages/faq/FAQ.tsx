import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import FAQContent from "./FAQContent";
import BottomBar from "../../components/BottomBar";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />
      <div className="h-[calc(100%-59px)] overflow-auto flex flex-col justify-between">
        <div className="flex-1 p-4">
          <FAQContent />
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default FAQ;
