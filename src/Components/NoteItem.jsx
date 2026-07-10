import React, { useContext } from "react";
import { TiEdit } from "react-icons/ti";
import { AiTwotoneDelete } from "react-icons/ai";
import NoteContext from "../Context/notes/noteContext";
import { formatDistanceToNow } from "date-fns";

const NoteItem = ({ item, updateNote }) => {
  const { deleteNote } = useContext(NoteContext);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition mt-6">

      {/* Title */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mb-4">
        <h1 className="font-bold text-lg shrink-0">
          Title:
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 break-all">
          {item?.title}
        </h2>
      </div>

      {/* Description */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
        <h1 className="font-bold text-lg shrink-0">
          Content:
        </h1>

        <p className="text-sm sm:text-base text-gray-600 break-all leading-relaxed">
          {item?.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 text-xs sm:text-sm text-gray-500">

        {/* Date */}
        <p className="break-words">
          {item?.date &&
            formatDistanceToNow(new Date(item.date), {
              addSuffix: true,
            })}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 text-2xl self-end sm:self-auto">

          <button
            onClick={() => updateNote(item)}
            className="text-blue-500 hover:scale-110 transition duration-200"
          >
            <TiEdit />
          </button>

          <button
            onClick={() => deleteNote(item._id)}
            className="text-red-500 hover:scale-110 transition duration-200"
          >
            <AiTwotoneDelete />
          </button>

        </div>
      </div>
    </div>
  );
};

export default NoteItem;