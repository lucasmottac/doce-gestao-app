import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import Calculator from './pages/Calculator';
import SalesKit from './pages/SalesKit';
import FirstSale from './pages/FirstSale';
import GoldenTips from './pages/GoldenTips';
import Strategies from './pages/Strategies';

import OtherRecipes from './pages/OtherRecipes';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/recipes" element={
            <ProtectedRoute>
              <Recipes />
            </ProtectedRoute>
          } />
          <Route path="/other-recipes" element={
            <ProtectedRoute>
              <OtherRecipes />
            </ProtectedRoute>
          } />
          <Route path="/calculator" element={
            <ProtectedRoute>
              <Calculator />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/sales-kit" element={
            <ProtectedRoute>
              <SalesKit />
            </ProtectedRoute>
          } />
          <Route path="/first-sale" element={
            <ProtectedRoute>
              <FirstSale />
            </ProtectedRoute>
          } />
          <Route path="/golden-tips" element={
            <ProtectedRoute>
              <GoldenTips />
            </ProtectedRoute>
          } />
          <Route path="/strategies" element={
            <ProtectedRoute>
              <Strategies />
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
