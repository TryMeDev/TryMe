import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Button } from "primereact/button";
import { cat, display } from "../../slices/catsSlice";
import { setCurrentCat } from "../../slices/preferenceSlice";
import Design from "../../assets/imgs/DesignCategory.webp";

const imgMap: Record<string, string> = {
  "669f636482acb022f9139e03": Design,
};

// const imgMap: Record<string, string> = {
//   "66b6e8e4e82430e7d6def2e0": Design,
// };

const CatButton: React.FC<{ cat: cat }> = ({ cat }) => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.preference.lang);

  return imgMap[cat._id] ? (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        dispatch(setCurrentCat({ cat: cat._id }));
      }}
    >
      <img
        src={imgMap[cat._id]}
        alt={cat.display[lang as keyof display]}
        className="w-full h-auto object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
      <div className="absolute top-0 w-full h-full z-10 flex items-center justify-end pr-7">
        <span
          className="text-center w-[34%] font-bold sm:text-3xl lg:text-4xl text-2xl glow-white"
          style={{ color: "var(--primary-color" }}
        >
          {cat.display[lang as keyof display]}
        </span>
      </div>
    </div>
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
