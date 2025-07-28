import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import ProjectPage from "@/pages/projects";
import ServicesPage from "@/pages/services";
import LoginForm from "@/pages/LoginForm";
import RegisterPage from "@/pages/RegisterPage";
import AdminDashboard from '@/pages/admin/AdminDashboard'
import EducationForm from '@/pages/admin/EducationForm'
import ProjectForm from '@/pages/admin/ProjectForm'
import EducationList from '@/pages/admin/EducationList'
import ProjectList from '@/pages/admin/ProjectList'

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
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/education"
          element={
            <ProtectedRoute requiredRole="admin">
              <EducationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/project"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education/list"
          element={
            <ProtectedRoute requiredRole="admin">
              <EducationList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education/add"
          element={
            <ProtectedRoute requiredRole="admin">
              <EducationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EducationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/list"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProjectList />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
