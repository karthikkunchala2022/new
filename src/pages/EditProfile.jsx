import { useState } from 'react';

function EditProfile() {
  const [formData, setFormData] = useState({
    designation: '',
    roomNo: '',
    email: '',
    areaOfInterest: '',
    contact: '',
    payLevel: '',
    joiningDate: '',
    leaveBalance: '',
    casualLeave: '',
    earnedLeave: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Profile updated successfully.");
    // TODO: Send formData to backend
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-600 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-600 rounded-full z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">Edit My Profile</h1>

          <div className="space-y-4">
            {[
              { label: 'Designation', name: 'designation' },
              { label: 'Room No', name: 'roomNo' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Area of Interest', name: 'areaOfInterest' },
              { label: 'Contact Number', name: 'contact' },
              { label: 'Pay Level', name: 'payLevel' },
              { label: 'Joining Date', name: 'joiningDate', type: 'date' },
              { label: 'Current Leave Balance', name: 'leaveBalance', type: 'number' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
