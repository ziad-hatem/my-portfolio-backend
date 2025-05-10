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
import { Textarea } from "@/components/ui/textarea"
import { createWorkExperience, updateWorkExperience } from "@/lib/actions/work-experience-actions"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  startDate: z.string(),
  endDate: z.string(),
})

type WorkExperienceFormValues = z.infer<typeof formSchema>

interface WorkExperienceFormProps {
  initialData?: Partial<WorkExperienceFormValues> & { id?: number }
  userId: string
  isEditing?: boolean
}

export default function WorkExperienceForm({ initialData, userId, isEditing = false }: WorkExperienceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Format dates for form input
  const formatDateForInput = (dateString?: string | Date) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const defaultValues: Partial<WorkExperienceFormValues> = {
    userId,
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: formatDateForInput(initialData?.startDate) || "",
    endDate: initialData?.endDate || "",
  }

  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: WorkExperienceFormValues) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      if (isEditing && initialData?.id) {
        const result = await updateWorkExperience(initialData.id, formData)
        if (result.success) {
          toast({
            title: "Work Experience updated",
            description: "Work Experience has been updated successfully",
          })
          router.push(`/dashboard/users/${userId}/work-experience`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      } else {
        const result = await createWorkExperience(formData)
        if (result.success) {
          toast({
            title: "Work Experience created",
            description: "Work Experience has been created successfully",
          })
          router.push(`/dashboard/users/${userId}/work-experience`)
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
        <CardTitle>{isEditing ? "Edit Work Experience" : "Create Work Experience"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update work experience information" : "Add a new work experience entry"}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>This is the title of your work experience</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your work experience" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>This is the description of your work experience</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Present or date" {...field} />
                    </FormControl>
                    <FormDescription>Enter "Present" for current job</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/users/${userId}/work-experience`)}
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
