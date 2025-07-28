import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow-sm">
        <h1 className="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/education/list" 
            className="bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800"
          >
            Education
          </Link>

          <Link
            to="/project/list"
            className="bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800"
          >
            Project
          </Link>

          <Link
            to="/register"
            className="bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800"
          >
            List All Users
          </Link>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-3 rounded text-center hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
