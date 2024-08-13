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
//   "66b6e8e4e82430e7d6def2e0": `url(${Design})`,
// };

const CatButton: React.FC<{ cat: cat }> = ({ cat }) => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preference.lang);

  const buttonStyle = {
    backgroundImage: imgMap[cat._id] ?? "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return imgMap[cat._id] ? (
    <Button
      className="w-full h-48"
      style={buttonStyle}
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <span className="font-bold text-2xl text-black bg-white bg-opacity-30">
          {cat.display[lang as keyof display]}
        </span>
      </div>
    </Button>
  ) : (
    <Button
      className="w-full"
      outlined
      label={cat.display[lang as keyof display]}
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
    />
  );
};

export default CatButton;
