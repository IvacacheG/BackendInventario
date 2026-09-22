import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Componente para proteger rutas si no hay Token JWT
const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <div className="p-8 text-center">
                <h1 className="text-3xl font-bold text-emerald-400">¡Bienvenido al Dashboard!</h1>
                <p className="mt-2 text-slate-400">Aquí mostremos las alertas de stock y los productos.</p>
              </div>
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}