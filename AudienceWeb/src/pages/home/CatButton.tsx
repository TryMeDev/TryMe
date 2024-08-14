import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Button } from "primereact/button";
import { cat, display } from "../../slices/catsSlice";
import { setCurrentCat } from "../../slices/preferenceSlice";
import Design from "../../assets/imgs/Design.jpg";

const imgMap: Record<string, string> = {
  "669f636482acb022f9139e03": `url(${Design})`,
};

// const imgMap: Record<string, string> = {
//   "66b6e8e4e82430e7d6def2e0": Design,
// };

const CatButton: React.FC<{ cat: cat }> = ({ cat }) => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preference.lang);

  return imgMap[cat._id] ? (
    <Button
      className="w-full h-48 relative"
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
      text
      raised
    >
      <img
        src={imgMap[cat._id]}
        alt={cat.display[lang as keyof display]}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        loading="lazy"
      />
      <div className="relative z-10 w-full h-full flex justify-start items-end">
        <span className="font-bold text-2xl text-black">
          {cat.display[lang as keyof display]}
        </span>
      </div>
    </Button>
  ) : (
    <Button
      className="w-full"
      text
      raised
      label={cat.display[lang as keyof display]}
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
    />
  );
};

export default CatButton;
