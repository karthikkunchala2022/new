import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, Bell, Menu, X } from "lucide-react";

function Header() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      taskId: 12,
      message: "Task 'Update Website' was marked as complete by AS.",
      read: false,
    },
    {
      id: 2,
      taskId: 15,
      message: "New unassigned task 'Organize Event Files' posted.",
      read: false,
    },
  ]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", description: "View personal tasks" },
    { name: "Common Dashboard", path: "/common", description: "View shared tasks" },
    { name: "Create Task", path: "/create-task", description: "Assign a new task" },
    { name: "Add Leaves", path: "/leave", description: "Mark leave for staff" },
    { name: "Staff List", path: "/staff", description: "View and manage staff" },
  ];

  return (
    <>
      <header className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            Admin Module
          </Link>

          {/* Desktop Nav with Tooltips */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`hover:text-orange-400 transition ${
                    location.pathname === link.path ? "text-orange-400" : ""
                  }`}
                >
                  {link.name}
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                  {link.description}
                </div>
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-6 relative">
            {/* Notifications */}
            <div className="relative group">
              <button
                onClick={toggleNotifications}
                className="relative hover:text-orange-400 transition"
              >
                <Bell className="w-6 h-6" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                Notifications
              </div>
            </div>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-12 right-0 md:right-10 w-80 bg-white text-black rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in">
                <div className="p-4 font-semibold border-b text-gray-800">
                  Notifications
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-500">No notifications</div>
                ) : (
                  <ul className="max-h-64 overflow-y-auto divide-y">
                    {notifications.map((note) => (
                      <li
                        key={note.id}
                        className={`px-4 py-3 text-sm ${
                          note.read
                            ? "bg-gray-50 text-gray-500"
                            : "bg-white text-black"
                        } hover:bg-gray-100 transition`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            to={`/task/${note.taskId}/subtasks`}
                            className="hover:underline flex-1"
                            onClick={() => {
                              markAsRead(note.id);
                              setShowNotifications(false);
                            }}
                          >
                            {note.message}
                          </Link>
                          {!note.read && (
                            <button
                              onClick={() => markAsRead(note.id)}
                              className="text-blue-600 text-xs hover:underline"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Profile */}
            <div className="relative group">
              <Link to="/profile" className="hover:text-orange-400 transition">
                <UserCircle className="w-7 h-7" />
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                Profile
              </div>
            </div>

            {/* Hamburger Icon */}
            <div className="relative group md:hidden">
              <button onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-7 h-7" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                Menu
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 w-64 h-full bg-white text-black z-50 shadow-lg flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-orange-500 transition ${
                    location.pathname === link.path ? "text-orange-500" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.3s ease-out forwards;
          }
          @keyframes slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </>
  );
}

export default Header;
