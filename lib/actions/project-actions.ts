"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const title = formData.get("title") as string
    const youtubeUrl = formData.get("youtubeUrl") as string
    const imageUrl = formData.get("imageUrl") as string
    const projectUrl = formData.get("projectUrl") as string
    const linkedinUrl = formData.get("linkedinUrl") as string
    const githubUrl = formData.get("githubUrl") as string
    const technologiesJson = formData.get("technologies") as string

    if (!userId || !title || !imageUrl || !projectUrl) {
      throw new Error("User ID, title, image URL, and project URL are required")
    }

    let technologies = []
    if (technologiesJson) {
      technologies = JSON.parse(technologiesJson)
    }

    const project = await db.projects.create({
      data: {
        userId,
        title,
        youtubeUrl,
        imageUrl,
        projectUrl,
        linkedinUrl,
        githubUrl,
        technologies: {
          connect: technologies.map((tech: string) => ({ id: tech })),
        },
      },
    })

    revalidatePath(`/dashboard/users/${userId}/projects`)
    return { success: true, project }
  } catch (error) {
    console.error("Error creating project:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const youtubeUrl = formData.get("youtubeUrl") as string
    const imageUrl = formData.get("imageUrl") as string
    const projectUrl = formData.get("projectUrl") as string
    const linkedinUrl = formData.get("linkedinUrl") as string
    const githubUrl = formData.get("githubUrl") as string
    const technologiesJson = formData.get("technologies") as string
    const userId = formData.get("userId") as string

    if (!title || !imageUrl || !projectUrl) {
      throw new Error("Title, image URL, and project URL are required")
    }

    let technologies = []
    if (technologiesJson) {
      technologies = JSON.parse(technologiesJson)
    }

    // First disconnect all existing technologies
    await db.projects.update({
      where: { id },
      data: {
        technologies: {
          set: [],
        },
      },
    })

    // Then update with new data and connect new technologies
    const project = await db.projects.update({
      where: { id },
      data: {
        title,
        youtubeUrl,
        imageUrl,
        projectUrl,
        linkedinUrl,
        githubUrl,
        technologies: {
          connect: technologies.map((tech: string) => ({ id: tech })),
        },
      },
    })

    revalidatePath(`/dashboard/users/${userId}/projects`)
    return { success: true, project }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteProject(id: string, userId: string) {
  try {
    // First disconnect all technologies
    await db.projects.update({
      where: { id },
      data: {
        technologies: {
          set: [],
        },
      },
    })

    // Then delete the project
    await db.projects.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/users/${userId}/projects`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getProjects(userId: string) {
  try {
    const projects = await db.projects.findMany({
      where: { userId },
      include: {
        technologies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, projects }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { success: false, error: (error as Error).message }
  }
}
