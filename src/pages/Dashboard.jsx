import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskCard from "../components/TaskCard";
import { FiFilter } from "react-icons/fi";

const tasksData = [
  {
    id: 1,
    title: "Prepare Monthly Report",
    deadline: "May 5, 2025",
    priority: "High",
    assignedTo: "Ravi Teja",
    createdBy: "Prof. Sharma",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Organize Workshop",
    deadline: "May 15, 2025",
    priority: "Medium",
    assignedTo: "Anjali",
    createdBy: "Prof. Sharma",
    status: "Pending",
  },
  {
    id: 3,
    title: "Finalize Brochure",
    deadline: "May 3, 2025",
    priority: "Low",
    assignedTo: "Ravi Teja",
    createdBy: "Prof. Nair",
    status: "Completed",
  },
];

function Dashboard() {
  const [tasks, setTasks] = useState(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    assignedTo: "",
    createdBy: "",
    status: "",
    priority: "",
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAssignToMe = (taskId) => {
    console.log(`Assigning task ${taskId} to current user...`);
  };

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
    setOpenMenuId(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getUnique = (field) => [...new Set(tasks.map((t) => t[field]))];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAssignedTo =
      filters.assignedTo === "" || task.assignedTo === filters.assignedTo;
    const matchesCreatedBy =
      filters.createdBy === "" || task.createdBy === filters.createdBy;
    const matchesStatus =
      filters.status === "" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "" || task.priority === filters.priority;
    return (
      matchesSearch &&
      matchesAssignedTo &&
      matchesCreatedBy &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="p-6 pt-20 ">
      <h1 className="title text-xl sm:text-2xl mb-4 text-center sm:text-left">
        Task Dashboard
      </h1>

      {/* Search + Filter Toggle */}
      {/* Search + Filter Toggle */}
      <div className="flex flex-nowrap items-center justify-between gap-2 mb-4 overflow-x-auto">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow max-w-[70%] border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[150px]"
        />

        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition whitespace-nowrap"
        >
          <FiFilter size={18} />
          Filters
        </button>
      </div>

      {/* Filters */}
      {filtersVisible && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 transition-all duration-300">
          <select
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Assigned To</option>
            {getUnique("assignedTo").map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <select
            name="createdBy"
            value={filters.createdBy}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Created By (Faculty)</option>
            {getUnique("createdBy").map((faculty) => (
              <option key={faculty}>{faculty}</option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Status</option>
            <option>Pending</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      )}

      {/* Task Cards */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={confirmDelete}
            onMenuToggle={toggleMenu}
            openMenuId={openMenuId}
            setTaskToDelete={setTaskToDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
