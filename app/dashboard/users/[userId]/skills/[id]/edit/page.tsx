import { getMySkills } from "@/lib/actions/my-skills-actions"
import MySkillForm from "@/components/forms/my-skill-form"

export default async function EditSkillPage({ params }: { params: { userId: string; id: string } }) {
  const { mySkills = [] } = (await getMySkills(params.userId)) || {}
  const skill = mySkills.find((item) => item.id === params.id)

  if (!skill) {
    return <div>Skill not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Skill</h1>
      <MySkillForm initialData={skill} userId={params.userId} isEditing />
    </div>
  )
}
