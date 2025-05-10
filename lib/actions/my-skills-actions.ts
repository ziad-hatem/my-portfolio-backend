"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createMySkill(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const name = formData.get("name") as string
    const icon = formData.get("icon") as string

    if (!userId || !name || !icon) {
      throw new Error("User ID, name, and icon are required")
    }

    const mySkill = await db.mySkills.create({
      data: {
        userId,
        name,
        icon,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/skills`)
    return { success: true, mySkill }
  } catch (error) {
    console.error("Error creating skill:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateMySkill(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const icon = formData.get("icon") as string
    const userId = formData.get("userId") as string

    if (!name || !icon) {
      throw new Error("Name and icon are required")
    }

    const mySkill = await db.mySkills.update({
      where: { id },
      data: {
        name,
        icon,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/skills`)
    return { success: true, mySkill }
  } catch (error) {
    console.error("Error updating skill:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteMySkill(id: string, userId: string) {
  try {
    await db.mySkills.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/users/${userId}/skills`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting skill:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getMySkills(userId: string) {
  try {
    const mySkills = await db.mySkills.findMany({
      where: { userId },
      orderBy: {
        name: "asc",
      },
    })

    return { success: true, mySkills }
  } catch (error) {
    console.error("Error fetching skills:", error)
    return { success: false, error: (error as Error).message }
  }
}
