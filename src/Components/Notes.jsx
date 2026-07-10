import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = useContext(NoteContext);

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  // Submit update note
  const onSubmit = (data) => {
    if (!editId) return;

    editNote(editId, data.title, data.description, data.tag);

    setOpenModal(false);
    setEditId(null);
    reset();
  };

  // Open edit modal
  const updateNote = (current) => {
    setEditId(current._id);
    setOpenModal(true);

    reset({
      title: current.title,
      description: current.description,
      tag: current.tag,
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
              <h2 className="text-lg sm:text-xl font-semibold">
                Edit Note
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-4 sm:p-6">

                <input
                  {...register("title", { required: true })}
                  placeholder="Title"
                  className="w-full border p-3 rounded-lg mb-3"
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mb-2">
                    Title required
                  </p>
                )}

                <textarea
                  {...register("description", { required: true })}
                  placeholder="Description"
                  rows={4}
                  className="w-full border p-3 rounded-lg mb-3 resize-none"
                />

                <input
                  {...register("tag")}
                  placeholder="Tag"
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 p-4 border-t">

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="w-full sm:w-auto px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>

              </div>
            </form>

          </div>
        </div>
      )}

      {/* ADD NOTE */}
      <div className="w-full max-w-5xl mx-auto">
        <AddNote />
      </div>

      {/* NOTES LIST */}
      <div className="w-full max-w-5xl mx-auto mt-6">

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 break-words">
          Your Notes
        </h2>

        {Array.isArray(notes) && notes.length > 0 ? (
          notes
            .filter((item) => item && item._id)
            .map((item) => (
              <NoteItem
                key={item._id}
                item={item}
                updateNote={updateNote}
              />
            ))
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            No notes to display
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;