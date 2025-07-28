import React, { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar"
import Footer from '../components/Footer'
import { Button } from "@/components/ui/button"

const API_BASE = import.meta.env.VITE_API_BASE_URL

export default function AboutPage() {
  const [educations, setEducations] = useState([])

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`${API_BASE}/qualifications`)
        const data = await res.json()
        setEducations(data)
      } catch (err) {
        console.error('Error fetching education:', err)
      }
    }
    fetchEducation()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">About Me</h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg shadow-lg">
                <img src={"/jano.jfif" || "/placeholder.svg"} alt="Jano Imnida" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Brill John Torino</h2>
              <p className="text-slate-600 mb-6">
                I'm a passionate web developer and a current Software Engineering student at 
                Centennial College, with over 2 years of self-taught experience building modern, 
                responsive websites and applications. I enjoy working across the full stack, 
                with a strong interest in both front-end and back-end development.
              </p>
              <p className="text-slate-600 mb-6">
                I love coding and bringing ideas to life through functional and user-friendly interfaces. 
                My approach combines technical skills with creative problem-solving to deliver solutions 
                that exceed expectations. I'm always exploring new tools and technologies to stay current 
                and continuously improve as a developer.
              </p>
              <div className="mt-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "JavaScript",
                "React",
                "HTML/CSS",
                "Node.js",
                "UI/UX Design",
                "Responsive Design",
                "Git",
                "RESTful APIs",
              ].map((skill) => (
                <div key={skill} className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Education & Experience (dynamic) */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Education & Experience</h2>
            <div className="space-y-6">
              {educations.length === 0 ? (
                <p className="text-center text-slate-500">No education records available.</p>
              ) : (
                educations.map((edu) => (
                  <div key={edu._id} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-slate-500">
                      {edu.schoolName} | {edu.gradMonth} {edu.gradYear}
                    </p>
                    {edu.fieldOfStudy && (
                      <p className="text-slate-400 text-sm">{edu.fieldOfStudy}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
