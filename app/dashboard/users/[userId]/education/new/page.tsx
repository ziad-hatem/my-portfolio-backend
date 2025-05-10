import EducationForm from "@/components/forms/education-form"

export default function NewEducationPage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Education</h1>
      <EducationForm userId={params.userId} />
    </div>
  )
}
