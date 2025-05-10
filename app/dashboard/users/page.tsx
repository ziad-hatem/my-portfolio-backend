import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUsers } from "@/lib/actions/user-actions"
import { Plus, Pencil } from "lucide-react"

export default async function UsersPage() {
  const { users = [] } = (await getUsers()) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button asChild>
          <Link href="/dashboard/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {users.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No users found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create your first user to get started.</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{user.name || "Unnamed User"}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/users/${user.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {user.position && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Position:</span>
                      <span className="text-sm">{user.position}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Location:</span>
                      <span className="text-sm">{user.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
