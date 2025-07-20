import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInNavbar from '@/components/SignInNavbar';

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
  const { title, completion, description, image, tags, link, firstname, lastname, email } = projectData;

  try {
    const res = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completion, description, image, tags, link, firstname, lastname, email })
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Project added successfully!');
      navigate('/project/list'); // ✅ Redirect to project list
    } else {
      setProjectData({ ...projectData, error: data.error });
    }
  } catch (err) {
    setProjectData({ ...projectData, error: 'Server error. Please try again later.' });
  }
};

  return (
    <>
      <SignInNavbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Add Project</h2>

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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
