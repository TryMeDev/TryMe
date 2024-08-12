import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setIs18 } from "../../slices/preferenceSlice";
import { InputSwitch } from "primereact/inputswitch";
import { useAppDispatch } from "../../app/store";
import { ToggleButton } from "primereact/togglebutton";

const Is18Toggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const preference = useSelector((state: any) => state.preference);

  return (
    <div className="flex gap-1 items-center mt-3">
      <ToggleButton
        className="w-full"
        checked={preference.is18}
        onChange={(e) => dispatch(setIs18({ is18: e.value }))}
        onLabel={t("settings.is18")}
        offLabel={t("settings.isNot18")}
      />
    </div>
  );
};

export default Is18Toggle;
