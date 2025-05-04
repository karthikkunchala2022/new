import { useState } from "react";
import { useParams } from "react-router-dom";
import UploadButton from "../components/UploadButton"; // adjust path as needed
import SubtaskForm from "../components/SubtaskForm";
import CommentList from "../components/CommentList";

const mockTask = {
  id: 1,
  title: "Organize Research Conference",
  description: "Coordinate all logistics and invitations.",
  deadline: "2025-05-20",
  status: "Ongoing",
  assignedTo: "Ravi Teja",
  priority: "High",
};

const initialSubtasks = [
  { id: 1, title: "Book venue", completed: false, createdAt: new Date() },
  {
    id: 2,
    title: "Invite speakers",
    completed: true,
    createdAt: new Date("2025-04-20T12:00:00"),
    completedAt: new Date("2025-04-22T15:00:00"),
  },
];

function SubTask() {
  const { id } = useParams();
  const [subtasks, setSubtasks] = useState(initialSubtasks);
  const [newSubtask, setNewSubtask] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [taskComments, setTaskComments] = useState(["Initial discussion done."]);
  const [commentInput, setCommentInput] = useState("");
  const [subtaskToConfirm, setSubtaskToConfirm] = useState(null);
  const [commentAttachments, setCommentAttachments] = useState({});
  const [fileInput, setFileInput] = useState(null);

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddComment = async () => {
    if (!commentInput.trim() && !fileInput) return;

    const newIndex = taskComments.length;
    const newComments = [...taskComments, commentInput.trim()];
    setTaskComments(newComments);

    if (fileInput) {
      const imgData = await readFileAsDataURL(fileInput);
      setCommentAttachments((prev) => ({ ...prev, [newIndex]: imgData }));
      setFileInput(null);
    }

    setCommentInput("");
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim() === "") return;
    const newItem = {
      id: subtasks.length + 1,
      title: newSubtask,
      completed: false,
      createdAt: new Date(),
    };
    setSubtasks([...subtasks, newItem]);
    setNewSubtask("");
  };

  const toggleCompleteConfirmed = () => {
    if (!subtaskToConfirm) return;
    setSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === subtaskToConfirm.id
          ? {
              ...sub,
              completed: !sub.completed,
              completedAt: !sub.completed ? new Date() : null,
            }
          : sub
      )
    );
    setSubtaskToConfirm(null);
  };

  const deleteSubtask = (id) => {
    setSubtasks(subtasks.filter((sub) => sub.id !== id));
    setMenuOpen(null);
  };

  const saveEdit = (id) => {
    setSubtasks(
      subtasks.map((sub) =>
        sub.id === id ? { ...sub, title: editTitle } : sub
      )
    );
    setEditMode(null);
    setMenuOpen(null);
  };

  const renderTimelineSection = (title, filteredSubtasks) => (
    <div className="mt-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
      <div className="relative border-l-4 border-orange-500 ml-4 pl-6 space-y-6">
        {filteredSubtasks.map((sub) => (
          <div key={sub.id} className="relative group">
            <div className="absolute -left-3.5 top-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
            <div
              className={`bg-white rounded-lg shadow p-4 transition-all ${
                sub.completed ? "opacity-70 bg-green-50" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex-1 text-sm sm:text-base">
                  {editMode === sub.id ? (
                    <input
                      className="border rounded p-1 w-full mb-1"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <h3
                      className={`text-md font-semibold ${
                        sub.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {sub.title}
                    </h3>
                  )}
                  <p className="text-xs text-gray-400">
                    Created on: {sub.createdAt.toLocaleString()}
                  </p>
                  {sub.completed && (
                    <p className="text-xs text-gray-400">
                      Completed on: {sub.completedAt?.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSubtaskToConfirm(sub)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    {sub.completed ? "Undo" : "Mark Complete"}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === sub.id ? null : sub.id)
                      }
                      className="text-lg sm:text-xl px-2 hover:text-gray-600"
                    >
                      ⋮
                    </button>
                    {menuOpen === sub.id && (
                      <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white border rounded shadow z-10 text-sm sm:text-base">
                        {editMode === sub.id ? (
                          <>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => saveEdit(sub.id)}
                            >
                              Save
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => setEditMode(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setEditMode(sub.id);
                                setEditTitle(sub.title);
                              }}
                            >
                              Edit Subtask
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                              onClick={() => deleteSubtask(sub.id)}
                            >
                              Delete Subtask
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const pendingSubtasks = subtasks.filter((s) => !s.completed);
  const completedSubtasks = subtasks.filter((s) => s.completed);

  return (
    <div className="p-4 pt-20">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Subtasks for Task #{id}
      </h1>

      <div className="card bg-white rounded shadow p-4 mb-6 text-sm sm:text-base">
        <p><strong>Title:</strong> {mockTask.title}</p>
        <p><strong>Description:</strong> {mockTask.description}</p>
        <p><strong>Deadline:</strong> {mockTask.deadline}</p>
        <p><strong>Status:</strong> {mockTask.status}</p>
        <p><strong>Assigned to:</strong> {mockTask.assignedTo}</p>
        <p><strong>Priority:</strong> <span className="text-red-500">{mockTask.priority}</span></p>
      </div>

      {renderTimelineSection("Pending Subtasks", pendingSubtasks)}
      {renderTimelineSection("Completed Subtasks", completedSubtasks)}

      {/* Add Subtask Section */}
      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Add New Subtask</h2>
        <SubtaskForm
          onAdd={({ text, files }) => {
            // 1) call your API (or local state) to add the subtask + attachments:
            //    addSubtask(taskId, text, files).then(() => reloadSubtasks());
            // 2) if you’re using local state as a mock, you can do:
            const newItem = {
              id: subtasks.length + 1,
              title: text,
              completed: false,
              createdAt: new Date(),
              attachments: files
            };
            setSubtasks(prev => [...prev, newItem]);
          }}
        />
      </div>
      {/* Task Comments */}
      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Task Comments</h2>

        <CommentList
          comments={taskComments.map((text, idx) => ({
            id: idx,
            author: "You", // or pull actual author name
            timestamp: new Date().toLocaleString(), // or use createdAt if you track it
            text,
            attachment: commentAttachments[idx] // if you want to render images
          }))}
          onAdd={async (newText) => {
            // 1) POST to your API: await postComment(taskId, newText);
            // 2) Update local state/mock:
            setTaskComments((prev) => [...prev, newText]);
          }}
        />
      </div>
      

      {/* Subtask Confirmation Dialog */}
      {subtaskToConfirm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded shadow-xl p-4 sm:p-6 w-full max-w-md mx-4 text-sm sm:text-base">
            <h2 className="text-lg font-semibold mb-2">Confirm Status Change</h2>
            <p className="mb-4">
              Are you sure you want to{" "}
              {subtaskToConfirm.completed ? "undo completion of" : "mark"}{" "}
              <strong>"{subtaskToConfirm.title}"</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => setSubtaskToConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                onClick={toggleCompleteConfirmed}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubTask;
