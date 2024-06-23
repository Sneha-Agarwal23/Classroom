import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Dashboard from './pages/Dashboard';
import AdminRegistration from './pages/AdminRegistration';
import TeacherRegistration from './pages/TeacherRegistration';
import SchoolRegistration from './pages/SchoolRegistration';
import ProgramEnroll from './pages/ProgramEnroll';
import AdmissionForm from './pages/AdmissionForm';
import AttendancePage from './pages/AttendancePage';
import StudentList from './pages/StudentList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin/admin" element={<SignInPage userType="Admin" />} />
        <Route path="/signin/teacher" element={<SignInPage userType="Teacher" />} />
        <Route path="/signin/parent/guardian" element={<SignInPage userType="Parent/Guardian" />} />
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/registration" element={<AdminRegistration/>}></Route>
        <Route path="/teacher/registration" element={<TeacherRegistration/>}></Route>
        <Route path="/school/registration" element={<SchoolRegistration/>}></Route>
        <Route path="/programenroll" element={<ProgramEnroll/>}></Route>
        <Route path="/admission" element={<AdmissionForm/>}></Route>
        <Route path="/attendance" element={<AttendancePage/>}></Route>
        <Route path="/children" element={<StudentList/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
