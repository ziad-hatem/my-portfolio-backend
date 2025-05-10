import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMySkills } from "@/lib/actions/my-skills-actions"
import { deleteMySkill } from "@/lib/actions/my-skills-actions"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function SkillsPage({ params }: { params: { userId: string } }) {
  const { mySkills = [] } = (await getMySkills(params.userId)) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Button asChild>
          <Link href={`/dashboard/users/${params.userId}/skills/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mySkills.length === 0 ? (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>No skills found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add your first skill to get started.</p>
            </CardContent>
          </Card>
        ) : (
          mySkills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <div className="relative h-8 w-8 mr-2">
                    <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} fill className="object-contain" />
                  </div>
                  {skill.name}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/users/${params.userId}/skills/${skill.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <form
                    action={async () => {
                      "use server"
                      await deleteMySkill(skill.id, params.userId)
                    }}
                  >
                    <Button variant="destructive" size="icon" type="submit">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </form>
                </div>
              </CardHeader>
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
