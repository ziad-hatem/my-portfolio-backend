"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createEducation(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const startDate = new Date(formData.get("startDate") as string)
    const endDate = new Date(formData.get("endDate") as string)

    if (!userId || !title || !description || !startDate || !endDate) {
      throw new Error("All fields are required")
    }

    const education = await db.education.create({
      data: {
        userId,
        title,
        description,
        startDate,
        endDate,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/education`)
    return { success: true, education }
  } catch (error) {
    console.error("Error creating education:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateEducation(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const startDate = new Date(formData.get("startDate") as string)
    const endDate = new Date(formData.get("endDate") as string)
    const userId = formData.get("userId") as string

    if (!title || !description || !startDate || !endDate) {
      throw new Error("All fields are required")
    }

    const education = await db.education.update({
      where: { id },
      data: {
        title,
        description,
        startDate,
        endDate,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/education`)
    return { success: true, education }
  } catch (error) {
    console.error("Error updating education:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteEducation(id: number, userId: string) {
  try {
    await db.education.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/users/${userId}/education`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting education:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getEducations(userId: string) {
  try {
    const educations = await db.education.findMany({
      where: { userId },
      orderBy: {
        startDate: "desc",
      },
    })

    return { success: true, educations }
  } catch (error) {
    console.error("Error fetching educations:", error)
    return { success: false, error: (error as Error).message }
  }
}
