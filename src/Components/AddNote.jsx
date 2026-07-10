import React, { useContext } from "react";
import NoteContext from "../Context/notes/noteContext";
import { useForm } from "react-hook-form";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addNote(data.title, data.description, data.tag);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4 sm:py-2 w-full">
      {/* Heading */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words">
          Add a Note
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>

          <input
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
            type="text"
            placeholder="Enter your title"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1 break-words">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 5,
                message: "Description must be at least 5 characters",
              },
            })}
            rows={4}
            placeholder="Enter your description"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1 break-words">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Tag */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag
          </label>

          <input
            {...register("tag", {
              required: "Tag is required",
              minLength: {
                value: 2,
                message: "Tag must be at least 2 characters",
              },
            })}
            type="text"
            placeholder="Enter your tag"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.tag && (
            <p className="text-red-500 text-sm mt-1 break-words">
              {errors.tag.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;