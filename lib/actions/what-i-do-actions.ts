"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createWhatIDo(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const title = formData.get("title") as string
    const text = formData.get("text") as string

    if (!userId || !title || !text) {
      throw new Error("User ID, title, and text are required")
    }

    const whatIDo = await db.whatIDo.create({
      data: {
        userId,
        title,
        text,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/what-i-do`)
    return { success: true, whatIDo }
  } catch (error) {
    console.error("Error creating what I do:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateWhatIDo(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const text = formData.get("text") as string
    const userId = formData.get("userId") as string

    if (!title || !text) {
      throw new Error("Title and text are required")
    }

    const whatIDo = await db.whatIDo.update({
      where: { id },
      data: {
        title,
        text,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/what-i-do`)
    return { success: true, whatIDo }
  } catch (error) {
    console.error("Error updating what I do:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteWhatIDo(id: number, userId: string) {
  try {
    await db.whatIDo.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/users/${userId}/what-i-do`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting what I do:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getWhatIDos(userId: string) {
  try {
    const whatIDos = await db.whatIDo.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, whatIDos }
  } catch (error) {
    console.error("Error fetching what I dos:", error)
    return { success: false, error: (error as Error).message }
  }
}
