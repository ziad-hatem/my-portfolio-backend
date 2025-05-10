import WhatIDoForm from "@/components/forms/what-i-do-form"

export default function NewWhatIDoPage({ params }: { params: { userId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add What I Do</h1>
      <WhatIDoForm userId={params.userId} />
    </div>
  )
}
