import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const API_BASE = import.meta.env.VITE_API_BASE_URL

const tagOptions = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js',
  'Express', 'MongoDB', 'Tailwind CSS', 'Bootstrap', 'TypeScript'
];

const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    completion: '',
    description: '',
    image: '/jano.jfif',
    tags: [],
    link: '/',
    firstname: 'Brill',
    lastname: 'Torino',
    email: 'brill@gmail.com',
    error: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // 🔁 Fetch existing project if in edit mode
  useEffect(() => {
    if (id) {
      fetch(`${API_BASE}/projects/${id}`)
        .then(res => res.json())
        .then(data => {
          setProjectData({
            title: data.title || '',
            completion: data.completion?.split('T')[0] || '',
            description: data.description || '',
            image: data.image || '',
            tags: data.tags || [],
            link: data.link || '',
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            email: data.email || '',
            error: ''
          });
        })
        .catch(err => {
          console.error('❌ Failed to fetch project:', err);
          setProjectData(prev => ({ ...prev, error: 'Error loading project' }));
        });
    }
  }, [id]);

  const handleChange = (name) => (e) => {
    setProjectData({ ...projectData, [name]: e.target.value });
  };

  const handleTagChange = (tag) => {
    const newTags = projectData.tags.includes(tag)
      ? projectData.tags.filter((t) => t !== tag)
      : [...projectData.tags, tag];
    setProjectData({ ...projectData, tags: newTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title, completion, description, image,
      tags, link, firstname, lastname, email
    } = projectData;

    try {
      const res = await fetch(`${API_BASE}/projects${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completion, description, image, tags, link, firstname, lastname, email })
      });

      const data = await res.json();

      if (res.ok) {
        alert(id ? '✅ Project updated successfully!' : '✅ Project added successfully!');
        navigate('/project/list');
      } else {
        setProjectData(prev => ({ ...prev, error: data.error }));
      }
    } catch (err) {
      console.error('❌ Submission error:', err);
      setProjectData(prev => ({ ...prev, error: 'Server error. Please try again later.' }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-3xl font-bold mb-6">{id ? 'Edit Project' : 'Add Project'}</h2>

        {projectData.error && (
          <p className="text-red-600 mb-4">{projectData.error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={projectData.title}
            onChange={handleChange('title')}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="date"
            placeholder="Completion Date"
            value={projectData.completion}
            onChange={handleChange('completion')}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Project Description"
            value={projectData.description}
            onChange={handleChange('description')}
            required
            className="w-full p-2 border rounded"
          />

          <div>
            <p className="mb-2 font-medium">Select Tags:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {tagOptions.map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={projectData.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="accent-blue-600"
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-3 rounded text-center cursor-pointer hover:bg-gray-800"
          >
            {id ? 'Update Project' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
