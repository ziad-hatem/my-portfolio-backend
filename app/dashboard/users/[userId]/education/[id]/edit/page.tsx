import { getEducations } from "@/lib/actions/education-actions"
import EducationForm from "@/components/forms/education-form"

export default async function EditEducationPage({ params }: { params: { userId: string; id: string } }) {
  const { educations = [] } = (await getEducations(params.userId)) || {}
  const education = educations.find((item) => item.id === Number.parseInt(params.id))

  if (!education) {
    return <div>Education not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Education</h1>
      <EducationForm initialData={education} userId={params.userId} isEditing />
    </div>
  )
}
