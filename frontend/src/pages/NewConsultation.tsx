import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewConsultation() {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleProcess = () => {
    navigate('/consultations/review');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setNotes('Ravi Kumar is 42 years old. He has had fever for three days with headache and body pain. His temperature is 101.2 degrees Fahrenheit and his blood pressure is 130 over 85. No vomiting.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Consultation</h1>
        <p className="text-sm text-gray-500 mt-1">Patient: Ravi Kumar (PAT-001)</p>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`pb-3 px-4 font-medium text-sm border-b-2 ${inputMode === 'text' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setInputMode('text')}
          >
            Text Entry
          </button>
          <button 
            className={`pb-3 px-4 font-medium text-sm border-b-2 ${inputMode === 'voice' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setInputMode('voice')}
          >
            Voice Dictation
          </button>
        </div>

        {inputMode === 'voice' && (
          <div className="mb-6 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <button 
              onClick={toggleRecording}
              className={`h-16 w-16 rounded-full flex items-center justify-center shadow-md text-white ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary-600 hover:bg-primary-700'}`}
            >
              {isRecording ? '⏹' : '🎤'}
            </button>
            <p className="mt-4 text-sm text-gray-600">
              {isRecording ? 'Recording... click to stop' : 'Click to start speaking naturally about the patient'}
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Transcript / Notes</label>
          <textarea
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your clinical notes here, or use voice dictation..."
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleProcess}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            disabled={!notes}
          >
            Generate AI Draft
          </button>
        </div>
      </div>
    </div>
  );
}
