import React from "react";
import { useAppDispatch } from "../../app/store";
import { setSearchingTags } from "../../slices/preferenceSlice";

type BottomTagsProps = {
  tags: string[];
};

const BottomTags: React.FC<BottomTagsProps> = ({ tags }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex flex-wrap p-2 gap-2 absolute bg-black bg-opacity-30 bottom-0">
      {tags?.map((tag) => (
        <span
          key={tag}
          className="text-white cursor-pointer underline"
          onClick={(e) => {
            e.isPropagationStopped();
            e.preventDefault();
            dispatch(setSearchingTags({ searchingTags: [tag] }));
          }}
        >{`#${tag}`}</span>
      ))}
    </div>
  );
};

export default BottomTags;
