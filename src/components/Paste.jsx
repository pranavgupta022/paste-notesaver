import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faTrash,
  faCopy,
  faShare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <div className="relative mt-5">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-80 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          className="p-2 pl-10 rounded-2xl min-w-[600px] border border-gray-700"
          type="search"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            const formattedDate = new Date(paste.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <div
                key={paste?._id}
                className="relative border p-4 bg-gray-950 text-white rounded-lg border-none "
              >
                <div className="absolute top-3 left-4 font-bold text-lg">
                  {paste.title}
                </div>
                <div className="absolute top-3 right-4 flex gap-3">
                  <a href={`/?pasteId=${paste?._id}`} className="text-white">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-white text-lg"
                    />
                  </a>
                  <a href={`/pastes/${paste?._id}`} className="text-white">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-white text-lg"
                    />
                  </a>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="text-white bg-transparent border-none outline-none p-0"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white text-lg"
                    />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="text-white bg-transparent border-none outline-none p-0"
                  >
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-white text-lg"
                    />
                  </button>
                  <button className="text-white bg-transparent border-none outline-none p-0">
                    <FontAwesomeIcon
                      icon={faShare}
                      className="text-white text-lg"
                    />
                  </button>
                </div>
                <div className="absolute top-10 right-5 text-gray-400 text-sm">
                  {formattedDate}
                </div>
                <div className="mt-12 text-left">{paste.content}</div>
              </div>
            );
          })
        ) : (
          <p className="text-white">No matching pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
