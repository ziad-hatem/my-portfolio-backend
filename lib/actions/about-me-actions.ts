"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createAboutMe(formData: FormData) {
  try {
    const userId = formData.get("userId") as string
    const description = formData.get("description") as string
    const yearsOfExperience = Number.parseInt(formData.get("yearsOfExperience") as string) || 0
    const trainingCourses = Number.parseInt(formData.get("trainingCourses") as string) || 0
    const awardsCertificates = Number.parseInt(formData.get("awardsCertificates") as string) || 0

    if (!userId) {
      throw new Error("User ID is required")
    }

    // Check if about me already exists for this user
    const existingAboutMe = await db.aboutMe.findUnique({
      where: { userId },
    })

    let aboutMe

    if (existingAboutMe) {
      // Update existing record
      aboutMe = await db.aboutMe.update({
        where: { userId },
        data: {
          description,
          yearsOfExperience,
          trainingCourses,
          awardsCertificates,
        },
      })
    } else {
      // Create new record
      aboutMe = await db.aboutMe.create({
        data: {
          userId,
          description,
          yearsOfExperience,
          trainingCourses,
          awardsCertificates,
        },
      })
    }

    revalidatePath(`/dashboard/users/${userId}`)
    return { success: true, aboutMe }
  } catch (error) {
    console.error("Error creating/updating about me:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getAboutMe(userId: string) {
  try {
    const aboutMe = await db.aboutMe.findUnique({
      where: { userId },
    })

    return { success: true, aboutMe }
  } catch (error) {
    console.error("Error fetching about me:", error)
    return { success: false, error: (error as Error).message }
  }
}
