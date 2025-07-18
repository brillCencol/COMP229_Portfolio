import React, { useState } from 'react'

const EducationForm = () => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: ''
  })

  const [message, setMessage] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch('http://localhost:3000/api/educations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Education added successfully!')
        setFormData({
          institution: '',
          degree: '',
          field: '',
          startYear: '',
          endYear: ''
        })
      } else {
        setMessage(data.error || 'Error occurred.')
      }
    } catch (err) {
      setMessage('Server error')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Education</h2>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" required className="w-full border p-2 rounded" />
        <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" required className="w-full border p-2 rounded" />
        <input type="text" name="field" value={formData.field} onChange={handleChange} placeholder="Field of Study" required className="w-full border p-2 rounded" />
        <input type="text" name="startYear" value={formData.startYear} onChange={handleChange} placeholder="Start Year" required className="w-full border p-2 rounded" />
        <input type="text" name="endYear" value={formData.endYear} onChange={handleChange} placeholder="End Year" required className="w-full border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  )
}

export default EducationForm
