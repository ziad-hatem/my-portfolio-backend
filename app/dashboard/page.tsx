import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUsers } from "@/lib/actions/user-actions"
import { getTechnologies } from "@/lib/actions/technology-actions"
import { Users, Layers, Plus } from "lucide-react"

export default async function DashboardPage() {
  const { users = [] } = (await getUsers()) || {}
  const { technologies = [] } = (await getTechnologies()) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your portfolio users</CardDescription>
            </div>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-sm text-muted-foreground">Total users</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/dashboard/users/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Technologies</CardTitle>
              <CardDescription>Manage your technologies</CardDescription>
            </div>
            <Layers className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{technologies.length}</div>
            <p className="text-sm text-muted-foreground">Total technologies</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/dashboard/technologies/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Technology
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
