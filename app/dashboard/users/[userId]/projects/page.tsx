import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects } from "@/lib/actions/project-actions"
import { deleteProject } from "@/lib/actions/project-actions"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function ProjectsPage({ params }: { params: { userId: string } }) {
  const { projects = [] } = (await getProjects(params.userId)) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href={`/dashboard/users/${params.userId}/projects/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {projects.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No projects found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add your first project to get started.</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{project.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/users/${params.userId}/projects/${project.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <form
                    action={async () => {
                      "use server"
                      await deleteProject(project.id, params.userId)
                    }}
                  >
                    <Button variant="destructive" size="icon" type="submit">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative h-40 w-full md:w-64 rounded-md overflow-hidden">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech.id} variant="secondary">
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Project URL
                          </a>
                        </div>
                        {project.githubUrl && (
                          <div className="flex items-center">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              GitHub
                            </a>
                          </div>
                        )}
                        {project.linkedinUrl && (
                          <div className="flex items-center">
                            <a
                              href={project.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              LinkedIn
                            </a>
                          </div>
                        )}
                        {project.youtubeUrl && (
                          <div className="flex items-center">
                            <a
                              href={project.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              YouTube
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/users/${params.userId}`}>Back to Profile</Link>
        </Button>
      </div>
    </div>
  )
}
