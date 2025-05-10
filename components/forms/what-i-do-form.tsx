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
import { createWhatIDo, updateWhatIDo } from "@/lib/actions/what-i-do-actions"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  text: z.string().min(10, { message: "Text must be at least 10 characters" }),
})

type WhatIDoFormValues = z.infer<typeof formSchema>

interface WhatIDoFormProps {
  initialData?: WhatIDoFormValues & { id?: number }
  userId: string
  isEditing?: boolean
}

export default function WhatIDoForm({ initialData, userId, isEditing = false }: WhatIDoFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Partial<WhatIDoFormValues> = {
    userId,
    title: initialData?.title || "",
    text: initialData?.text || "",
  }

  const form = useForm<WhatIDoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: WhatIDoFormValues) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      if (isEditing && initialData?.id) {
        const result = await updateWhatIDo(initialData.id, formData)
        if (result.success) {
          toast({
            title: "What I Do updated",
            description: "What I Do has been updated successfully",
          })
          router.push(`/dashboard/users/${userId}/what-i-do`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      } else {
        const result = await createWhatIDo(formData)
        if (result.success) {
          toast({
            title: "What I Do created",
            description: "What I Do has been created successfully",
          })
          router.push(`/dashboard/users/${userId}/what-i-do`)
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
        <CardTitle>{isEditing ? "Edit What I Do" : "Create What I Do"}</CardTitle>
        <CardDescription>{isEditing ? "Update what you do" : "Add a new service or activity"}</CardDescription>
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
                  <FormDescription>This is the title of what you do</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe what you do" className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormDescription>This is the description of what you do</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/users/${userId}/what-i-do`)}
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
