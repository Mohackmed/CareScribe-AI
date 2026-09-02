import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    todaysConsultations: 0,
    pendingReviews: 0,
    followUps: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Load Patients
    const storedPatients = localStorage.getItem('carescribe_patients');
    let loadedPatients = [];
    if (storedPatients) {
      loadedPatients = JSON.parse(storedPatients);
      setPatients(loadedPatients);
    } else {
      const initial = [
        { id: 'PAT-001', name: 'Ravi Kumar', age: 42, lastVisit: 'Today', gender: 'Male', phone: '+91 9876543210', address: '123 Main St, Chennai' },
        { id: 'PAT-002', name: 'Sita Devi', age: 35, lastVisit: 'Yesterday', gender: 'Female', phone: '+91 9988776655', address: '45 Park Ave, Chennai' }
      ];
      setPatients(initial);
      loadedPatients = initial;
      localStorage.setItem('carescribe_patients', JSON.stringify(initial));
    }

    // 2. Load Consultations
    const storedConsultations = localStorage.getItem('carescribe_consultations');
    let loadedConsultations = [];
    if (storedConsultations) {
      loadedConsultations = JSON.parse(storedConsultations);
    } else {
      const initialConsultations = [
        { id: 'CON-1001', patientName: 'Ravi Kumar', date: 'Today, 10:30 AM', status: 'PENDING_REVIEW', type: 'Voice AI' },
        { id: 'CON-1002', patientName: 'Sita Devi', date: 'Yesterday, 02:15 PM', status: 'APPROVED', type: 'Text' },
        { id: 'CON-1003', patientName: 'John Doe', date: 'Aug 24, 11:00 AM', status: 'DRAFT', type: 'Voice AI' },
      ];
      loadedConsultations = initialConsultations;
      localStorage.setItem('carescribe_consultations', JSON.stringify(initialConsultations));
    }

    // 3. Compute accurate metrics based on actual data
    const todays = loadedConsultations.filter((c: any) => c.date.includes('Today')).length;
    const pending = loadedConsultations.filter((c: any) => c.status === 'PENDING_REVIEW').length;
    
    // Follow-ups mock metric for now, could be backed by localstorage later
    const followUps = 5; 

    setMetrics({
      totalPatients: loadedPatients.length,
      todaysConsultations: todays,
      pendingReviews: pending,
      followUps: followUps
    });

  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-3">
          <Link to="/patients/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors">
            + New Patient
          </Link>
          <Link to="/consultations/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors">
            Start Consultation
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Total Patients", stat: metrics.totalPatients },
          { name: "Today's Consultations", stat: metrics.todaysConsultations },
          { name: 'Drafts Pending Review', stat: metrics.pendingReviews },
          { name: 'Follow-ups Today', stat: metrics.followUps }
        ].map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
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
          {patients.length === 0 ? (
            <p className="py-4 text-gray-500 text-sm">No recent patients.</p>
          ) : (
            patients.slice(0, 5).map((patient) => (
              <div key={patient.id} className="py-4 flex justify-between items-center hover:bg-gray-50 px-2 -mx-2 rounded-md transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{patient.name} ({patient.id})</p>
                  <p className="text-sm text-gray-500">{patient.age} yrs • Last visit: {patient.lastVisit}</p>
                </div>
                <button 
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="text-sm text-primary-600 hover:text-primary-900 font-medium px-3 py-1 rounded border border-primary-200 hover:bg-primary-50 transition-colors">
                  View Profile
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
