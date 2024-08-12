import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Button } from "primereact/button";
import { cat, display } from "../../slices/catsSlice";
import { setCurrentCat } from "../../slices/preferenceSlice";

const CatButton: React.FC<{ cat: cat }> = ({ cat }) => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preference.lang);

  return (
    <Button
      className="w-full"
      label={cat.display[lang as keyof display]}
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
    />
  );
};

export default CatButton;
