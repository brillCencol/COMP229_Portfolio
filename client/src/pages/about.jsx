import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
                I'm a passionate web developer with over 5 years of experience creating modern, responsive websites and
                applications. I specialize in front-end development with expertise in React and modern JavaScript.
              </p>
              <p className="text-slate-600 mb-6">
                My approach combines technical expertise with creative problem-solving to deliver solutions that not
                only meet but exceed client expectations. I'm constantly learning and exploring new technologies to stay
                at the forefront of web development.
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

          {/* Education & Experience */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Education & Experience</h2>
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-lg">Software Engineering Technician</h3>
                <p className="text-slate-500">Centennial College | 2024 - Present</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-lg">IBM Solutions</h3>
                <p className="text-slate-500">Java Developer | 2007 - 2009</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-lg">Bachelor of Science in Computer Science</h3>
                <p className="text-slate-500">De La Salle Lipa - University | 2007</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
