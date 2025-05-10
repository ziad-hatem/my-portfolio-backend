"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createWorkExperience(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDateValue = formData.get("endDate") as string;
    const endDate =
      endDateValue === "Present" ? endDateValue : new Date(endDateValue);

    if (!userId || !title || !description || !startDate || !endDate) {
      throw new Error("All fields are required");
    }

    const workExperience = await db.workExperience.create({
      data: {
        userId,
        title,
        description,
        startDate,
        endDate: endDate === "Present" ? null : endDate,
      },
    });

    revalidatePath(`/dashboard/users/${userId}/work-experience`);
    return { success: true, workExperience };
  } catch (error) {
    console.error("Error creating work experience:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateWorkExperience(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDateValue = formData.get("endDate") as string;
    const endDate =
      endDateValue === "Present" ? endDateValue : new Date(endDateValue);

    if (!title || !description || !startDate || !endDate) {
      throw new Error("All fields are required");
    }

    const workExperience = await db.workExperience.update({
      where: { id },
      data: {
        title,
        description,
        startDate,
        endDate: endDate === "Present" ? null : endDate,
      },
    });

    const userId = formData.get("userId") as string;
    revalidatePath(`/dashboard/users/${userId}/work-experience`);
    return { success: true, workExperience };
  } catch (error) {
    console.error("Error updating work experience:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteWorkExperience(id: number, userId: string) {
  try {
    await db.workExperience.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/users/${userId}/work-experience`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting work experience:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getWorkExperiences(userId: string) {
  try {
    const workExperiences = await db.workExperience.findMany({
      where: { userId },
      orderBy: {
        startDate: "desc",
      },
    });

    return { success: true, workExperiences };
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    return { success: false, error: (error as Error).message };
  }
}
