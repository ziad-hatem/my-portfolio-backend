import { getProjects } from "@/lib/actions/project-actions"
import ProjectForm from "@/components/forms/project-form"

export default async function EditProjectPage({ params }: { params: { userId: string; id: string } }) {
  const { projects = [] } = (await getProjects(params.userId)) || {}
  const project = projects.find((item) => item.id === params.id)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <ProjectForm initialData={project} userId={params.userId} isEditing />
    </div>
  )
}
