import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [workerId, setWorkerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Front-end validation (sanitization against basic injection attempts in the UI)
    const injectionPattern = /['"\\=;]/;
    if (injectionPattern.test(workerId) || injectionPattern.test(password)) {
      setError("Invalid characters detected. Please use your official Worker ID.");
      setIsSubmitting(false);
      return;
    }

    try {
      // In a full production environment, this calls the Spring Boot backend
      // API which uses Spring Data JPA parameterized queries to prevent SQL Injection
      // and Spring Security to manage rate-limiting (Brute force protection).
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock authentication check
      if (workerId === 'NURSE-001' && password === 'password123') {
        // Securely store session token. Using sessionStorage ensures the user 
        // must log in again when the browser tab is closed.
        sessionStorage.setItem('carescribe_token', 'mock_jwt_secure_token');
        navigate('/dashboard');
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("A secure connection error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">CareScribe AI</h2>
        <p className="mt-2 text-sm text-gray-600">Clinical Documentation Assistant</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="workerId" className="block text-sm font-medium text-gray-700">Worker ID</label>
              <div className="mt-1">
                <input id="workerId" name="workerId" type="text" required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={workerId} onChange={(e) => setWorkerId(e.target.value)}
                  placeholder="e.g. NURSE-001"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            

            <div>
              <button type="submit" disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
                {isSubmitting ? 'Authenticating securely...' : 'Sign in'}
              </button>
            </div>
            <div className="text-xs text-center text-gray-500 mt-4">
              CareScribe AI assists with clinical documentation and does not provide medical diagnosis or replace professional clinical judgment.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
