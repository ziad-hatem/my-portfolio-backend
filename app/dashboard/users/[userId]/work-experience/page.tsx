import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWorkExperiences } from "@/lib/actions/work-experience-actions"
import { deleteWorkExperience } from "@/lib/actions/work-experience-actions"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default async function WorkExperiencePage({ params }: { params: { userId: string } }) {
  const { workExperiences = [] } = (await getWorkExperiences(params.userId)) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Work Experience</h1>
        <Button asChild>
          <Link href={`/dashboard/users/${params.userId}/work-experience/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {workExperiences.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No work experience found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add your first work experience entry to get started.</p>
            </CardContent>
          </Card>
        ) : (
          workExperiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{experience.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/users/${params.userId}/work-experience/${experience.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <form
                    action={async () => {
                      "use server"
                      await deleteWorkExperience(experience.id, params.userId)
                    }}
                  >
                    <Button variant="destructive" size="icon" type="submit">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <p className="text-sm text-muted-foreground">{experience.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Period:</span>
                    <span className="ml-2">
                      {format(new Date(experience.startDate), "MMM yyyy")} - {experience.endDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/users/${params.userId}`}>Back to Profile</Link>
        </Button>
      </div>
    </div>
  )
}
