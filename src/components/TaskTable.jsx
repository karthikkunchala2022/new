import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

/**
 * TaskTable component: displays tasks in a compact table with a 3-dot action menu
 * Props:
 *  - tasks: Array<{ id, title, deadline, assignedTo, createdBy, priority, status, menuOpen }>
 *  - onAction: (actionType: string, taskId: number) => void
 */
export default function TaskTable({ tasks, onAction }) {
  const statusClasses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Ongoing: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  };
  const priorityClasses = {
    High: 'text-red-600',
    Medium: 'text-orange-600',
    Low: 'text-green-600',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {['Title', 'Deadline', 'Assignee', 'Priority', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => onAction('view', task.id)}
              className="border-b hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.title}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{task.deadline}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{task.assignedTo}</td>
              <td className={`px-4 py-3 text-sm font-semibold ${priorityClasses[task.priority]}`}>{task.priority}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses[task.status]}`}>{task.status}</span>
              </td>
              <td className="px-4 py-3 text-right relative">
                <button
                  onClick={(e) => { e.stopPropagation(); onAction('toggleMenu', task.id); }}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Task options"
                >
                  <FiMoreVertical />
                </button>
                {task.menuOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm z-20">
                    <li>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAction('view', task.id); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        View Subtasks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAction('edit', task.id); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Task
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAction('delete', task.id); }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete Task
                      </button>
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}