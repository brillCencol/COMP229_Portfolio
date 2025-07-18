import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignInNavbar from '@/components/SignInNavbar'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <>
      <SignInNavbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow-sm">
        <h1 className="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/education"
            className="bg-blue-600 text-white px-4 py-3 rounded text-center hover:bg-blue-700"
          >
            Add Education
          </Link>

          <Link
            to="/admin/project"
            className="bg-green-600 text-white px-4 py-3 rounded text-center hover:bg-green-700"
          >
            Add Project
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-3 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
