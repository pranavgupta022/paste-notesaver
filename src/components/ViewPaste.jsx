import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);

  // Find the paste by ID
  const paste = allPaste.find((p) => p._id === id);

  // Handle case where paste is not found
  if (!paste) {
    return <div className="text-red-500">Paste not found</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between mt-5 ">
        <input
          className="p-3 rounded-xl mt-2 w-[66%] pl-4 border border-gray-700 font-bold"
          type="text"
          value={paste.title}
          disabled
        />
      </div>
      <div className="mt-4">
        <textarea
          className="p-3 rounded-xl mt-4 min-w-[600px] p-4 border border-gray-700 "
          value={paste.content}
          disabled
          rows={25}
          cols={70}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
