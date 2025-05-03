import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import TaskCard from "../components/TaskCard";

const tasksData = [
  {
    id: 1,
    title: "Prepare Monthly Report",
    deadline: "2025-05-05",
    priority: "High",
    assignedTo: "staff1",
    faculty: "Prof. Mehta"
  },
  {
    id: 2,
    title: "Inventory Check",
    deadline: "2025-05-10",
    priority: "Medium",
    assignedTo: null,
    faculty: "Prof. Mehta"
  },
  {
    id: 3,
    title: "Fix Printer",
    deadline: "2025-05-03",
    priority: "Low",
    assignedTo: "staff2",
    faculty: "Prof. Rao"
  }
];

function CommonDashboard() {
  const [tasks, setTasks] = useState(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [deadlineFilter, setDeadlineFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAssignToMe = (taskId) => {
    console.log(`Assigning task ${taskId} to current user...`);
  };

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesDeadline = !deadlineFilter || task.deadline === deadlineFilter;
    const matchesAssigned =
      assignedFilter === ""
        ? true
        : assignedFilter === "unassigned"
        ? task.assignedTo === null
        : task.assignedTo !== null;
    const matchesFaculty = !facultyFilter || task.faculty === facultyFilter;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesDeadline &&
      matchesAssigned &&
      matchesFaculty
    );
  });

  const uniqueFaculty = [...new Set(tasks.map((t) => t.faculty))];

  return (
    <div className="p-6 pt-20">
      <h1 className="title text-xl sm:text-2xl mb-4 text-center sm:text-left">Common Task Dashboard</h1>

      {/* Search + Filter Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-md border px-4 py-2 rounded shadow-sm focus:ring-orange-400"
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          <FiFilter size={18} />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-6 transition-all duration-300">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={deadlineFilter}
            onChange={(e) => setDeadlineFilter(e.target.value)}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          />

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Assignment</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <select
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Faculty</option>
            {uniqueFaculty.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            common={true}
            task={task}
            onAssign={handleAssignToMe}
            onMenuToggle={toggleMenu}
            openMenuId={openMenuId}
            onDelete={() => setTaskToDelete(task)}
          />
        ))
      ) : (
        <p className="text-gray-500">No tasks match the selected filters.</p>
      )}

      {/* Delete Confirmation */}
      {taskToDelete && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete the task{" "}
              <strong>"{taskToDelete.title}"</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button className="button-orange" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonDashboard;
