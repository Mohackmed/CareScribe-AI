import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session and enforce login next time
    sessionStorage.removeItem('carescribe_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">CareScribe AI</span>
            <nav className="ml-10 flex space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md font-medium">Dashboard</Link>
              <Link to="/patients" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md font-medium">Patients</Link>
              <Link to="/consultations" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md font-medium">Consultations</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Worker ID: NURSE-001</span>
            <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded px-3 py-1.5">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
