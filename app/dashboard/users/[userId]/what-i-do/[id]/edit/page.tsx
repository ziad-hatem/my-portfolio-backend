import { getWhatIDos } from "@/lib/actions/what-i-do-actions"
import WhatIDoForm from "@/components/forms/what-i-do-form"

export default async function EditWhatIDoPage({ params }: { params: { userId: string; id: string } }) {
  const { whatIDos = [] } = (await getWhatIDos(params.userId)) || {}
  const whatIDo = whatIDos.find((item) => item.id === Number.parseInt(params.id))

  if (!whatIDo) {
    return <div>Item not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit What I Do</h1>
      <WhatIDoForm initialData={whatIDo} userId={params.userId} isEditing />
    </div>
  )
}
