"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTechnology(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const icon = formData.get("icon") as string

    if (!name || !icon) {
      throw new Error("Name and icon are required")
    }

    const technology = await db.technology.create({
      data: {
        name,
        icon,
      },
    })

    revalidatePath("/dashboard/technologies")
    return { success: true, technology }
  } catch (error) {
    console.error("Error creating technology:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateTechnology(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const icon = formData.get("icon") as string

    if (!name || !icon) {
      throw new Error("Name and icon are required")
    }

    const technology = await db.technology.update({
      where: { id },
      data: {
        name,
        icon,
      },
    })

    revalidatePath("/dashboard/technologies")
    return { success: true, technology }
  } catch (error) {
    console.error("Error updating technology:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteTechnology(id: string) {
  try {
    await db.technology.delete({
      where: { id },
    })

    revalidatePath("/dashboard/technologies")
    return { success: true }
  } catch (error) {
    console.error("Error deleting technology:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getTechnologies() {
  try {
    const technologies = await db.technology.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return { success: true, technologies }
  } catch (error) {
    console.error("Error fetching technologies:", error)
    return { success: false, error: (error as Error).message }
  }
}
