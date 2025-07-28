import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '@/components/navbar'

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Failed to load project list', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchProjects()
      }
    } catch (err) {
      alert('Delete failed')
    }
  }

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

        <h2 className="text-2xl font-semibold mt-4 mb-2">Your Projects</h2>
        <p className="text-gray-600 mb-6">
          Showcase your latest works, collaborations, and personal projects.
        </p>

        {projects.map((project, index) => (
          <div key={project._id} className="border rounded mb-4 p-4 relative shadow-sm">
            <div className="absolute top-2 left-2 bg-gray-100 text-sm px-2 py-1 rounded-full">
              {index + 1}
            </div>

            <div className="ml-8">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.date}</p>
              <p className="mt-2 text-gray-800">{project.description}</p>
              {project.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 space-x-3">
              <button
                onClick={() => navigate(`/project/edit/${project._id}`)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <div
          onClick={() => navigate('/admin/project')}
          className="border-2 border-dashed border-blue-400 text-blue-600 text-center py-4 rounded cursor-pointer hover:bg-blue-50 mt-6"
        >
          ➕ Add another project
        </div>
      </div>
    </div>
  )
}

export default ProjectList
