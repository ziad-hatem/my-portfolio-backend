import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTechnologies } from "@/lib/actions/technology-actions"
import { deleteTechnology } from "@/lib/actions/technology-actions"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function TechnologiesPage() {
  const { technologies = [] } = (await getTechnologies()) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Technologies</h1>
        <Button asChild>
          <Link href="/dashboard/technologies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Technology
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {technologies.length === 0 ? (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>No technologies found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add your first technology to get started.</p>
            </CardContent>
          </Card>
        ) : (
          technologies.map((technology) => (
            <Card key={technology.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <div className="relative h-8 w-8 mr-2">
                    <Image
                      src={technology.icon || "/placeholder.svg"}
                      alt={technology.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {technology.name}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/technologies/${technology.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <form
                    action={async () => {
                      "use server"
                      await deleteTechnology(technology.id)
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
    </div>
  )
}
