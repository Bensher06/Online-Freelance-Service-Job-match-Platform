import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
// Unified and Cleaned Imports
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection"; 
import JobSeekerHome from "./pages/usersPage/JobSeekerHome"; 
import JobSeekerSignUpPage from "./pages/usersPage/JobSeekerSignUpPage"; 
import EmployerHome from "./employerpage/EmployerHome"; 
import EmployerSignInPage from "./employerpage/EmployerSignInPage"; 
import BusinessVerification from './employerpage/EmployerVerificationForm';
import ClientProfile from './pages/usersPage/ClientProfile';
import AboutUs from "./pages/usersPage/About";
import WorkerListings from "./employerpage/WorkerListing";
import FreelancerProfile from "./pages/usersPage/FreelancerProfile";
import FreelancerProfileEdit from "./pages/usersPage/FreelancerProfileEdit";
import PostJobForm from "./pages/usersPage/PostJobForm";
import JobApplications from "./employerpage/JobApplication"

function App () {

  return(
    <Router>
      <Routes>
        {/* LANDING & AUTH FLOW */}
        <Route path="/" element={<Dashboard/>}/> {/* Main Dashboard (Employee/Employer choice) */}
        <Route path="/role-select" element={<RoleSelection/>}/> {/* Background-cycling Role Selection */}
        <Route path="/login" element={<Login/>}/> {/* Universal Email/Password/Google Login */}
        <Route path="/employee/signup" element={<JobSeekerSignUpPage/>}/> {/* Job Seeker Sign Up */}
        
        {/* JOB SEEKER (EMPLOYEE) FLOW */}
        <Route path="/employee/home" element={<JobSeekerHome/>}/> {/* Home Page w/ Modal */}
        <Route path="/employee/profile/:id" element={<FreelancerProfile/>}/> {/* Public view of Job Seeker Profile */}
        <Route path="/employee/profile/edit" element={<FreelancerProfileEdit/>}/> {/* Job Seeker Profile Edit */}
        <Route path="/company/:id" element={<ClientProfile/>}/> {/* Employer Profile View */}
        
        {/* EMPLOYER FLOW */}
        <Route path="/employer/home" element={<EmployerHome/>}/> {/* Employer Marketing Home */}
        <Route path="/employer/login" element={<EmployerSignInPage/>}/> {/* Employer Login (Separate form) */}
        <Route path="/employer/verify" element={<BusinessVerification/>}/> {/* Business Verification Form */}
        <Route path="/employer/talent-search" element={<WorkerListings/>}/> {/* Search Talent Page */}
        <Route path="/employer/post-job" element={<PostJobForm/>}/> {/* Job Posting Form */}
        <Route path="/employer/jobs/:jobId/applications" element={<JobApplications/>}/>
        {/* GENERAL PAGES */}
        <Route path="/about" element={<AboutUs/>}/>

        
      </Routes> 
    </Router>
  )
}
export default App;