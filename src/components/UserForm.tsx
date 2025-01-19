import React, { useState } from 'react';

interface UserFormProps {
  onSubmit: (data: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    gender: '',
    state: '',
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for time input to ensure proper format
    if (name === 'timeOfBirth') {
      // Ensure the time is in 24-hour format
      const timeValue = value.length === 5 ? value : value.padStart(5, '0');
      setFormData(prev => ({
        ...prev,
        [name]: timeValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            required
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time of Birth (24-hour format)</label>
          <input
            type="time"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            required
            step="60"
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            required
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            required
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            required
            className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
      >
        Generate Spiritual Guidance
      </button>
    </form>
  );
};

export default UserForm;