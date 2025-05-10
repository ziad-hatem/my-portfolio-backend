import { getWorkExperiences } from "@/lib/actions/work-experience-actions"
import WorkExperienceForm from "@/components/forms/work-experience-form"

export default async function EditWorkExperiencePage({ params }: { params: { userId: string; id: string } }) {
  const { workExperiences = [] } = (await getWorkExperiences(params.userId)) || {}
  const workExperience = workExperiences.find((item) => item.id === Number.parseInt(params.id))

  if (!workExperience) {
    return <div>Work Experience not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Work Experience</h1>
      <WorkExperienceForm initialData={workExperience} userId={params.userId} isEditing />
    </div>
  )
}
