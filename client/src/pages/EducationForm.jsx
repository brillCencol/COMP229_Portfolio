import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SignInNavbar from '@/components/SignInNavbar'

const EducationForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    schoolName: '',
    location: '',
    degree: '',
    fieldOfStudy: '',
    gradMonth: '',
    gradYear: ''
  })

  // Fetch existing education data if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/qualifications/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            schoolName: data.schoolName || '',
            location: data.location || '',
            degree: data.degree || '',
            fieldOfStudy: data.fieldOfStudy || '',
            gradMonth: data.gradMonth || '',
            gradYear: data.gradYear || ''
          })
        })
        .catch(err => {
          alert('Failed to load education data.')
          console.error(err)
        })
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/api/qualifications${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.error || 'Something went wrong.')
        return
      }

      alert(id ? 'Education updated successfully!' : 'Education saved successfully!')
      navigate('/education/list')
    } catch (err) {
      console.error('Submit error:', err)
      alert('Server error. Try again later.')
    }
  }

  const degrees = [
    'High School Diploma', 'GED', 'Associate of Arts', 'Associate of Science',
    'Associate of Applied Science', 'Bachelor of Arts', 'Bachelor of Science',
    'Master of Arts', 'Master of Science', 'MBA', 'J.D.', 'M.D.', 'Ph.D.',
    'Enter a different degree', 'No Degree'
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 50 }, (_, i) => 1980 + i)

  return (
    <div>
      <SignInNavbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-2">
          {id ? 'Edit your education' : 'Tell us about your experience so far'}
        </h2>
        <p className="text-gray-600 mb-6">
          Whether it's volunteer work, school projects, or leadership roles, we'll start there and show how it all counts toward your future!
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">School Name *</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">School Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degree *</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select</option>
              {degrees.map((deg) => (
                <option key={deg} value={deg}>
                  {deg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Graduation Month *</label>
            <select
              name="gradMonth"
              value={formData.gradMonth}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Graduation Year *</label>
            <select
              name="gradYear"
              value={formData.gradYear}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EducationForm
