import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new patient object
    const newPatient = {
      id: `PAT-00${Math.floor(Math.random() * 900) + 100}`,
      name: formData.name,
      age: parseInt(formData.age, 10),
      lastVisit: 'Just Added'
    };

    // Get existing patients or use defaults
    const existing = JSON.parse(localStorage.getItem('carescribe_patients') || '[]');
    if (existing.length === 0) {
      existing.push(
        { id: 'PAT-001', name: 'Ravi Kumar', age: 42, lastVisit: 'Today' },
        { id: 'PAT-002', name: 'Sita Devi', age: 35, lastVisit: 'Yesterday' }
      );
    }

    // Prepend new patient
    const updated = [newPatient, ...existing];
    localStorage.setItem('carescribe_patients', JSON.stringify(updated));

    // Update dashboard stats
    const stats = JSON.parse(localStorage.getItem('carescribe_stats') || '{"total": 120}');
    stats.total += 1;
    localStorage.setItem('carescribe_stats', JSON.stringify(stats));

    alert("Patient created successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
        <p className="text-sm text-gray-500 mt-1">Enter primary details for the patient register.</p>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={() => navigate('/dashboard')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
