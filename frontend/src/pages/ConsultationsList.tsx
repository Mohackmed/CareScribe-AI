import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ConsultationsList() {
  const [consultations, setConsultations] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('carescribe_consultations');
    if (stored) {
      setConsultations(JSON.parse(stored));
    } else {
      const initial = [
        { id: 'CON-1001', patientName: 'Ravi Kumar', date: 'Today, 10:30 AM', status: 'PENDING_REVIEW', type: 'Voice AI' },
        { id: 'CON-1002', patientName: 'Sita Devi', date: 'Yesterday, 02:15 PM', status: 'APPROVED', type: 'Text' },
        { id: 'CON-1003', patientName: 'John Doe', date: 'Aug 24, 11:00 AM', status: 'DRAFT', type: 'Voice AI' },
      ];
      setConsultations(initial);
      localStorage.setItem('carescribe_consultations', JSON.stringify(initial));
    }
  }, []);

  const changeStatus = (id: string, newStatus: string) => {
    // Only authorized reviewers/workers can change status in a real system
    const updated = consultations.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setConsultations(updated);
    localStorage.setItem('carescribe_consultations', JSON.stringify(updated));
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'APPROVED': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'PENDING_REVIEW': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Review Required</span>;
      case 'COMPLETED': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Completed</span>;
      default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Draft</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultations Workflow</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and update the status of clinical records.</p>
        </div>
        <Link to="/consultations/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          Start Consultation
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Manage Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No consultations found.</td>
                </tr>
              ) : (
                consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(c.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select 
                        value={c.status} 
                        onChange={(e) => changeStatus(c.id, e.target.value)}
                        className="ml-4 pl-2 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING_REVIEW">Review Required</option>
                        <option value="APPROVED">Approved</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
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
