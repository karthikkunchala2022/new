import { useNavigate } from "react-router-dom";

function ViewProfile({ role = 'faculty' }) {
  const navigate = useNavigate();

  const profileData = {
    name: 'Ravi Teja',
    designation: 'Assistant Professor',
    roomNo: 'B312',
    email: 'ravi.teja@iith.ac.in',
    areaOfInterest: 'Machine Learning, Computer Vision',
    contact: '+91 9876543210',
    payLevel: 'Level 12',
    joiningDate: '2020-06-15',
    leaveBalance: 12,
    casualLeave: 5,
    earnedLeave: 7,
    onLeave: true,
    leaveStart: '2025-04-28',
    leaveEnd: '2025-05-03',
    taskHistory: [
      { id: 1, title: 'Organize Workshop on AI' },
      { id: 2, title: 'Departmental Budget Planning' },
      { id: 3, title: 'Course Coordination - ML101' }
    ]
  };

  return (
    <div className="p-4 pt-20 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 text-center sm:text-left">
        Staff Profile
      </h1>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-5 text-sm sm:text-base">

        {/* Basic Info */}
        <div className="space-y-3">
          <div><strong>Name:</strong> {profileData.name}</div>
          <div><strong>Designation:</strong> {profileData.designation}</div>
          <div><strong>Room No:</strong> {profileData.roomNo}</div>
          <div className="break-words"><strong>Email:</strong> {profileData.email}</div>
          <div><strong>Area of Interest:</strong> {profileData.areaOfInterest}</div>
          <div><strong>Contact Number:</strong> {profileData.contact}</div>
        </div>

        {/* Staff/Admin Specific Info */}
        {(role === 'staff' || role === 'admin') && (
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div><strong>Pay Level:</strong> {profileData.payLevel}</div>
            <div><strong>Joining Date:</strong> {profileData.joiningDate}</div>
            <div><strong>Current Leave Balance:</strong> {profileData.leaveBalance}</div>
          </div>
        )}

        {/* Leave Status */}
        <div className="pt-4 border-t border-gray-200">
          <div className="font-semibold">
            Current Leave Status:
            <span className={`ml-2 px-2 py-1 rounded inline-block mt-2 sm:mt-0 ${profileData.onLeave
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
              }`}>
              {profileData.onLeave
                ? `On Leave (${profileData.leaveStart} to ${profileData.leaveEnd})`
                : 'Available'}
            </span>
          </div>
        </div>

        {/* Task History */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Task History</h2>
          <ul className="space-y-2">
            {profileData.taskHistory.map((task) => (
              <li
                key={task.id}
                onClick={() => navigate(`/task/${task.id}/subtasks`)}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ViewProfile;
