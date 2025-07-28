import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE = import.meta.env.VITE_API_BASE_URL

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-center mb-4 text-slate-800 tracking-tight drop-shadow-lg">
            My Projects
          </h1>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-20 text-lg">
            Here are some of the projects I've worked on. Each project represents a unique challenge and solution.
          </p>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project._id}
                className="group overflow-hidden shadow-xl rounded-3xl border-0 bg-white/90 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-slate-700 text-base pb-4">
                  <p>{project.description}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end">
                  <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors duration-200">
                      View Project
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
