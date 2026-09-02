import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PatientsList() {
  const [patients, setPatients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('carescribe_patients');
    if (stored) {
      setPatients(JSON.parse(stored));
    } else {
      const initial = [
        { id: 'PAT-001', name: 'Ravi Kumar', age: 42, gender: 'Male', phone: '+91 9876543210' },
        { id: 'PAT-002', name: 'Sita Devi', age: 35, gender: 'Female', phone: '+91 9988776655' }
      ];
      setPatients(initial);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all registered patients.</p>
        </div>
        <Link to="/patients/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          + New Patient
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No patients found.</td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.age} / {patient.gender || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.phone || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => navigate(`/patients/${patient.id}`)} className="text-primary-600 hover:text-primary-900">View Profile</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
