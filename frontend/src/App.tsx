import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import NewConsultation from './pages/NewConsultation';
import ReviewConsultation from './pages/ReviewConsultation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="consultations/new" element={<NewConsultation />} />
          <Route path="consultations/review" element={<ReviewConsultation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
