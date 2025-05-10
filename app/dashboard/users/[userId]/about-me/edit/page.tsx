import { getAboutMe } from "@/lib/actions/about-me-actions"
import AboutMeForm from "@/components/forms/about-me-form"

export default async function EditAboutMePage({ params }: { params: { userId: string } }) {
  const { aboutMe } = (await getAboutMe(params.userId)) || {}

  if (!aboutMe) {
    return <div>About Me not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit About Me</h1>
      <AboutMeForm initialData={aboutMe} userId={params.userId} />
    </div>
  )
}
