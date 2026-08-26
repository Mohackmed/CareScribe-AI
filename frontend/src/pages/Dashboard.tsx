import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-3">
          <Link to="/patients/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 bg-primary-100 hover:bg-primary-200">
            + New Patient
          </Link>
          <Link to="/consultations/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            Start Consultation
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[{ name: "Today's Consultations", stat: '12' },
          { name: 'Drafts Pending Review', stat: '3' },
          { name: 'Follow-ups Today', stat: '5' },
          { name: 'Documentation Rate', stat: '98%' }].map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-100 mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Patients</h2>
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {[
            { id: 'PAT-001', name: 'Ravi Kumar', age: 42, lastVisit: 'Today' },
            { id: 'PAT-002', name: 'Sita Devi', age: 35, lastVisit: 'Yesterday' }
          ].map((patient) => (
            <div key={patient.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{patient.name} ({patient.id})</p>
                <p className="text-sm text-gray-500">{patient.age} yrs • Last visit: {patient.lastVisit}</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-900 font-medium">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
