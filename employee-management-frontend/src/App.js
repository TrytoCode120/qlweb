import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}
export default App;