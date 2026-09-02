import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const stored = localStorage.getItem('carescribe_patients');
    if (stored) {
      const patients = JSON.parse(stored);
      const found = patients.find((p: any) => p.id === id);
      if (found) {
        setPatient(found);
        setFormData(found);
      } else {
        navigate('/patients');
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to archive/delete this patient record? This action requires appropriate authorization.")) {
      const stored = JSON.parse(localStorage.getItem('carescribe_patients') || '[]');
      const updated = stored.filter((p: any) => p.id !== id);
      localStorage.setItem('carescribe_patients', JSON.stringify(updated));
      
      const stats = JSON.parse(localStorage.getItem('carescribe_stats') || '{"total": 120}');
      stats.total = Math.max(0, stats.total - 1);
      localStorage.setItem('carescribe_stats', JSON.stringify(stats));

      alert("Patient record archived.");
      navigate('/patients');
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('carescribe_patients') || '[]');
    const updated = stored.map((p: any) => p.id === id ? { ...p, ...formData } : p);
    localStorage.setItem('carescribe_patients', JSON.stringify(updated));
    setPatient({ ...patient, ...formData });
    setIsEditing(false);
    alert("Patient details updated securely.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!patient) return <div className="p-8 text-center text-gray-500">Loading patient profile...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/patients')} className="text-gray-500 hover:text-gray-900">
            &larr; Back to Directory
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Patient Profile</h1>
        </div>
        <div className="space-x-3">
          <button onClick={handleDelete} className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
            Archive Patient
          </button>
          <Link to="/consultations/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            Start Consultation
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{patient.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">ID: {patient.id}</p>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-medium text-primary-600 hover:text-primary-800">
            {isEditing ? 'Cancel Edit' : 'Edit Details'}
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleUpdate} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Save Changes</button>
            </div>
          </form>
        ) : (
          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.age} years</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.gender || 'Not specified'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.phone || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.address || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
