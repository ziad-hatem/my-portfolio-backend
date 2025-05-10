import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser } from "@/lib/actions/user-actions"
import { Pencil, Plus, FileText, Briefcase, Code, MessageSquare, Award } from "lucide-react"
import Image from "next/image"

export default async function UserPage({ params }: { params: { userId: string } }) {
  const { user } = (await getUser(params.userId)) || {}

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">User not found</h1>
        <p>The user you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/dashboard/users">Back to Users</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{user.name || "User Profile"}</h1>
        <Button asChild variant="outline">
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit User
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              {user.image && (
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    alt={user.name || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.position}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{user.phoneNumber}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
              {user.linkedinUrl && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">LinkedIn:</span>
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            {user.aboutMe ? (
              <div className="space-y-4">
                <p className="text-sm">{user.aboutMe.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.aboutMe.yearsOfExperience}</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.aboutMe.trainingCourses}</div>
                    <div className="text-xs text-muted-foreground">Training Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.aboutMe.awardsCertificates}</div>
                    <div className="text-xs text-muted-foreground">Awards & Certificates</div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/dashboard/users/${user.id}/about-me/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit About Me
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <p className="text-center text-muted-foreground">No about me information added yet.</p>
                <Button asChild>
                  <Link href={`/dashboard/users/${user.id}/about-me/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add About Me
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>What I Do</CardTitle>
              <CardDescription>Services and activities</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/what-i-do`}>
                <FileText className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.whatIDo && user.whatIDo.length > 0 ? (
                <div>
                  <p className="text-sm">{user.whatIDo.length} items added</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Educational background</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/education`}>
                <FileText className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.education && user.education.length > 0 ? (
                <div>
                  <p className="text-sm">{user.education.length} items added</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Professional experience</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/work-experience`}>
                <Briefcase className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.workExperience && user.workExperience.length > 0 ? (
                <div>
                  <p className="text-sm">{user.workExperience.length} items added</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Portfolio projects</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/projects`}>
                <Code className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.projects && user.projects.length > 0 ? (
                <div>
                  <p className="text-sm">{user.projects.length} items added</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>Messages from visitors</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/contacts`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.contact && user.contact.length > 0 ? (
                <div>
                  <p className="text-sm">{user.contact.length} messages received</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No messages received yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Professional skills</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/users/${user.id}/skills`}>
                <Award className="mr-2 h-4 w-4" />
                Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.mySkills && user.mySkills.length > 0 ? (
                <div>
                  <p className="text-sm">{user.mySkills.length} skills added</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No skills added yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
