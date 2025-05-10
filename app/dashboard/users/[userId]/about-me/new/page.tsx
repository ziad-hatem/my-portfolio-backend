import AboutMeForm from "@/components/forms/about-me-form"

export default function NewAboutMePage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add About Me</h1>
      <AboutMeForm userId={params.userId} />
    </div>
  )
}
