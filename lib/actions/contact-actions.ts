"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createContact(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phoneNumber = formData.get("phoneNumber") as string
    const message = formData.get("message") as string

    if (!userId || !name || !email || !phoneNumber || !message) {
      throw new Error("All fields are required")
    }

    const contact = await db.contact.create({
      data: {
        userId,
        name,
        email,
        phoneNumber,
        message,
      },
    })

    revalidatePath(`/dashboard/users/${userId}/contacts`)
    return { success: true, contact }
  } catch (error) {
    console.error("Error creating contact:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteContact(id: string, userId: string) {
  try {
    await db.contact.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/users/${userId}/contacts`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting contact:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getContacts(userId: string) {
  try {
    const contacts = await db.contact.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, contacts }
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return { success: false, error: (error as Error).message }
  }
}
