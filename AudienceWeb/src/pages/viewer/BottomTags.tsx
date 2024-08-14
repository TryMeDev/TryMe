import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

interface BottomTagsProps {
    tags:string[]
}

const BottomTags: React.FC<BottomTagsProps> = ({
  tags
}) => {
  const navigate = useNavigate();


  return (
    <div className="w-full flex flex-wrap p-2 gap-2 absolute bg-black bg-opacity-30 bottom-0">
      {tags?.map((tag) => (
        <span className="text-white">{`#${tag}`}</span>
      ))}
    </div>
  );
};

export default BottomTags;
