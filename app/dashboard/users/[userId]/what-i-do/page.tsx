import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWhatIDos } from "@/lib/actions/what-i-do-actions"
import { deleteWhatIDo } from "@/lib/actions/what-i-do-actions"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function WhatIDoPage({ params }: { params: { userId: string } }) {
  const { whatIDos = [] } = (await getWhatIDos(params.userId)) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">What I Do</h1>
        <Button asChild>
          <Link href={`/dashboard/users/${params.userId}/what-i-do/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {whatIDos.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No items found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add your first "What I Do" item to get started.</p>
            </CardContent>
          </Card>
        ) : (
          whatIDos.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{item.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/users/${params.userId}/what-i-do/${item.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <form
                    action={async () => {
                      "use server"
                      await deleteWhatIDo(item.id, params.userId)
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
                <p className="text-sm text-muted-foreground">{item.text}</p>
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
