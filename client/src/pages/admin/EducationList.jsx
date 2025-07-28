import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar' 

const API_BASE = import.meta.env.VITE_API_BASE_URL

const EducationList = () => {
  const [educations, setEducations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchEducations()
  }, [])

  const fetchEducations = async () => {
    try {
      const res = await fetch(`${API_BASE}/qualifications`)
      const data = await res.json()
      setEducations(data)
    } catch (err) {
      console.error('Failed to load education list', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return
    try {
      const res = await fetch(`http://localhost:3000/api/qualifications/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchEducations()
      }
    } catch (err) {
      alert('Delete failed')
    }
  }

  const formatGraduation = (month, year) => `${month} ${year}`

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link
          to="#"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          &larr; Go Back
        </Link>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Your Education Background</h2>
        <p className="text-gray-600 mb-6">
          List your past education to showcase your achievements and learning experience.
        </p>

        {educations.map((edu, index) => (
          <div key={edu._id} className="border rounded mb-4 p-4 relative shadow-sm">
            <div className="absolute top-2 left-2 bg-gray-100 text-sm px-2 py-1 rounded-full">
              {index + 1}
            </div>

            <div className="ml-8">
              <h3 className="font-semibold text-lg">
                {edu.degree} - {edu.schoolName} {edu.fieldOfStudy && `| ${edu.fieldOfStudy}`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {edu.location} | {formatGraduation(edu.gradMonth, edu.gradYear)}
              </p>
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 space-x-3">
              <button
                onClick={() => navigate(`/education/edit/${edu._id}`)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(edu._id)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <div
          onClick={() => navigate('/education/add')}
          className="border-2 border-dashed border-blue-400 text-blue-600 text-center py-4 rounded cursor-pointer hover:bg-blue-50 mt-6"
        >
          ➕ Add another education
        </div>
      </div>
    </div>
  )
}

export default EducationList
