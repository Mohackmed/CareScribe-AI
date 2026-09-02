import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import NewConsultation from './pages/NewConsultation';
import ReviewConsultation from './pages/ReviewConsultation';
import NewPatient from './pages/NewPatient';
import PatientProfile from './pages/PatientProfile';
import PatientsList from './pages/PatientsList';
import ConsultationsList from './pages/ConsultationsList';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const token = sessionStorage.getItem('carescribe_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="patients" element={<PatientsList />} />
            <Route path="patients/new" element={<NewPatient />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            
            <Route path="consultations" element={<ConsultationsList />} />
            <Route path="consultations/new" element={<NewConsultation />} />
            <Route path="consultations/review" element={<ReviewConsultation />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
