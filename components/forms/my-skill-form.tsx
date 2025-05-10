"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { createMySkill, updateMySkill } from "@/lib/actions/my-skills-actions"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  userId: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  icon: z.string().min(1, { message: "Icon is required" }),
})

type MySkillFormValues = z.infer<typeof formSchema>

interface MySkillFormProps {
  initialData?: MySkillFormValues & { id?: string }
  userId: string
  isEditing?: boolean
}

export default function MySkillForm({ initialData, userId, isEditing = false }: MySkillFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Partial<MySkillFormValues> = {
    userId,
    name: initialData?.name || "",
    icon: initialData?.icon || "",
  }

  const form = useForm<MySkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: MySkillFormValues) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      if (isEditing && initialData?.id) {
        const result = await updateMySkill(initialData.id, formData)
        if (result.success) {
          toast({
            title: "Skill updated",
            description: "Skill has been updated successfully",
          })
          router.push(`/dashboard/users/${userId}/skills`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      } else {
        const result = await createMySkill(formData)
        if (result.success) {
          toast({
            title: "Skill created",
            description: "Skill has been created successfully",
          })
          router.push(`/dashboard/users/${userId}/skills`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Skill" : "Create Skill"}</CardTitle>
        <CardDescription>{isEditing ? "Update skill information" : "Add a new skill to your profile"}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Skill Name" {...field} />
                  </FormControl>
                  <FormDescription>This is the name of your skill</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <FileUpload endpoint="imageUploader" value={field.value || ""} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>Upload an icon for this skill</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/users/${userId}/skills`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
