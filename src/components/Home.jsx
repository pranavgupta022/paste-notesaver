import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes, addToPastes } from "../redux/pasteSlice.js";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste)); 
    } else {
      dispatch(addToPastes(paste)); 
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between mt-5 font-bold">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4 border border-gray-700 
 "
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 border border-gray-700
 rounded-2xl mt-2 bg-blue-400  text-white font-semibold transition duration-300"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="p-2 rounded-2xl mt-4 min-w-[500px] p-4 border border-gray-700 "
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={25}
          cols={70}
        />
      </div>
    </div>
  );
};

export default Home;
