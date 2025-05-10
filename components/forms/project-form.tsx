"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { createProject, updateProject } from "@/lib/actions/project-actions"
import { getTechnologies } from "@/lib/actions/technology-actions"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  youtubeUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  projectUrl: z.string().url({ message: "Please enter a valid URL" }),
  linkedinUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  githubUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  technologies: z.array(z.string()).optional(),
})

type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  initialData?: Partial<ProjectFormValues> & {
    id?: string
    technologies?: Array<{ id: string; name: string; icon: string }>
  }
  userId: string
  isEditing?: boolean
}

export default function ProjectForm({ initialData, userId, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [technologies, setTechnologies] = useState<Array<{ id: string; name: string; icon: string }>>([])

  useEffect(() => {
    const fetchTechnologies = async () => {
      const result = await getTechnologies()
      if (result.success) {
        setTechnologies(result.technologies)
      }
    }

    fetchTechnologies()
  }, [])

  // Extract technology IDs from initialData
  const initialTechIds = initialData?.technologies?.map((tech) => tech.id) || []

  const defaultValues: Partial<ProjectFormValues> = {
    userId,
    title: initialData?.title || "",
    youtubeUrl: initialData?.youtubeUrl || "",
    imageUrl: initialData?.imageUrl || "",
    projectUrl: initialData?.projectUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    githubUrl: initialData?.githubUrl || "",
    technologies: initialTechIds,
  }

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProjectFormValues) => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      // Add all form fields except technologies
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "technologies" && value !== undefined) {
          formData.append(key, value)
        }
      })

      // Add technologies as JSON string
      if (data.technologies) {
        formData.append("technologies", JSON.stringify(data.technologies))
      }

      if (isEditing && initialData?.id) {
        const result = await updateProject(initialData.id, formData)
        if (result.success) {
          toast({
            title: "Project updated",
            description: "Project has been updated successfully",
          })
          router.push(`/dashboard/users/${userId}/projects`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          })
        }
      } else {
        const result = await createProject(formData)
        if (result.success) {
          toast({
            title: "Project created",
            description: "Project has been created successfully",
          })
          router.push(`/dashboard/users/${userId}/projects`)
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
        <CardTitle>{isEditing ? "Edit Project" : "Create Project"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update project information" : "Add a new project to your portfolio"}
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
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormDescription>This is the title of your project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <FileUpload endpoint="imageUploader" value={field.value || ""} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>Upload a project image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>This is the URL to your live project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormDescription>This is the URL to your project demo video</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/..." {...field} />
                  </FormControl>
                  <FormDescription>This is the URL to your LinkedIn post about this project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormDescription>This is the URL to your GitHub repository</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Technologies</FormLabel>
                    <FormDescription>Select the technologies used in this project</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {technologies.map((technology) => (
                      <FormField
                        key={technology.id}
                        control={form.control}
                        name="technologies"
                        render={({ field }) => {
                          return (
                            <FormItem key={technology.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(technology.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), technology.id])
                                      : field.onChange(field.value?.filter((value) => value !== technology.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{technology.name}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/users/${userId}/projects`)}
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
