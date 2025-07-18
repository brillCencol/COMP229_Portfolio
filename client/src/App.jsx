import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import ProjectPage from "@/pages/projects";
import ServicesPage from "@/pages/services";
import LoginForm from "@/pages/LoginForm"; 
import AdminDashboard from '@/pages/AdminDashboard'
import EducationForm from '@/pages/EducationForm'
import ProjectForm from '@/pages/ProjectForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/education" element={<EducationForm />} />
        <Route path="/admin/project" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
