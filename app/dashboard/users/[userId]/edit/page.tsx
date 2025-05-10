import { getUser } from "@/lib/actions/user-actions"
import UserForm from "@/components/forms/user-form"

export default async function EditUserPage({ params }: { params: { userId: string } }) {
  const { user } = (await getUser(params.userId)) || {}

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit User</h1>
      <UserForm initialData={user} isEditing />
    </div>
  )
}
