import { getTechnologies } from "@/lib/actions/technology-actions"
import TechnologyForm from "@/components/forms/technology-form"

export default async function EditTechnologyPage({ params }: { params: { id: string } }) {
  const { technologies = [] } = (await getTechnologies()) || {}
  const technology = technologies.find((item) => item.id === params.id)

  if (!technology) {
    return <div>Technology not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Technology</h1>
      <TechnologyForm initialData={technology} isEditing />
    </div>
  )
}
