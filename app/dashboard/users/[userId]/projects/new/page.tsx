import ProjectForm from "@/components/forms/project-form"

export default function NewProjectPage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Project</h1>
      <ProjectForm userId={params.userId} />
    </div>
  )
}
