import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewConsultation() {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState('78');

  const handleSave = () => {
    alert("Draft saved and submitted for review!");
    navigate('/dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review AI Draft</h1>
          <p className="text-sm text-gray-500 mt-1">Patient: Ravi Kumar (PAT-001)</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-200">
          AI-Generated Draft - Review Required
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Extracted Data */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Clinical Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Chief Complaint</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" defaultValue="Fever" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" defaultValue="3 days" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <textarea rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" defaultValue="- Headache&#10;- Body pain"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Vitals</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature (°F)</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" defaultValue="101.2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" defaultValue="130/85" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pulse (BPM)</label>
                <div className="flex mt-1">
                  <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm" value={pulse} onChange={(e) => setPulse(e.target.value)} />
                  <button className="bg-gray-100 border-y border-r border-gray-300 px-3 py-2 rounded-r-md text-xs font-medium text-gray-600 hover:bg-gray-200">Measure</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-red-600">Respiratory Rate ⚠</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="Missing..." />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Original Transcript & Actions */}
        <div className="space-y-6">
          <div className="bg-gray-50 shadow rounded-lg border border-gray-200 p-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Original Transcript</h2>
            <p className="text-sm text-gray-600 italic">
              "Ravi Kumar is 42 years old. He has had fever for three days with headache and body pain. His temperature is 101.2 degrees Fahrenheit and his blood pressure is 130 over 85. No vomiting."
            </p>
          </div>

          <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Actions</h2>
            <button onClick={handleSave} className="w-full mb-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
              Submit for Review
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              Save as Draft
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full mt-3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
