import WorkExperienceForm from "@/components/forms/work-experience-form"

export default function NewWorkExperiencePage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Work Experience</h1>
      <WorkExperienceForm userId={params.userId} />
    </div>
  )
}
