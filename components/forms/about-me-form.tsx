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
import { createAboutMe } from "@/lib/actions/about-me-actions"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  userId: z.string(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  yearsOfExperience: z.coerce.number().int().min(0).optional(),
  trainingCourses: z.coerce.number().int().min(0).optional(),
  awardsCertificates: z.coerce.number().int().min(0).optional(),
})

type AboutMeFormValues = z.infer<typeof formSchema>

interface AboutMeFormProps {
  initialData?: Partial<AboutMeFormValues>
  userId: string
}

export default function AboutMeForm({ initialData, userId }: AboutMeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Partial<AboutMeFormValues> = {
    userId,
    description: initialData?.description || "",
    yearsOfExperience: initialData?.yearsOfExperience || 0,
    trainingCourses: initialData?.trainingCourses || 0,
    awardsCertificates: initialData?.awardsCertificates || 0,
  }

  const form = useForm<AboutMeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: AboutMeFormValues) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value))
        }
      })

      const result = await createAboutMe(formData)
      if (result.success) {
        toast({
          title: "About Me saved",
          description: "About Me information has been saved successfully",
        })
        router.push(`/dashboard/users/${userId}`)
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
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
        <CardTitle>About Me</CardTitle>
        <CardDescription>Add or update your personal information</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormDescription>This is your personal bio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trainingCourses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Courses</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="awardsCertificates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Awards & Certificates</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
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
              onClick={() => router.push(`/dashboard/users/${userId}`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
