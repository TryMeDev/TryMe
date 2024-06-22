import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar canLogout={false} />
      <div className="flex-1 flex flex-col justify-center p-4"></div>
    </div>
  );
};

export default FAQ;
