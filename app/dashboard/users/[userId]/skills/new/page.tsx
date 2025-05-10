import MySkillForm from "@/components/forms/my-skill-form"

export default function NewSkillPage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Skill</h1>
      <MySkillForm userId={params.userId} />
    </div>
  )
}
