// Teacher.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../context/ProtectedRoute';

export default function Teacher() {
  return (
    <ProtectedRoute requiredRole="teacher">
      <Routes>
        <Route path="dashboard" element={<div>Teacher Dashboard</div>} />
      </Routes>
    </ProtectedRoute>
  );
}
