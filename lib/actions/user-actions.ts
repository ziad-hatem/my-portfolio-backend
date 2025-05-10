"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const location = formData.get("location") as string;
    const cvUrl = formData.get("cvUrl") as string;

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        position,
        image,
        phoneNumber,
        linkedinUrl,
        location,
        cvUrl,
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateUser(userId: string, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const location = formData.get("location") as string;
    const cvUrl = formData.get("cvUrl") as string;

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        email,
        name,
        position,
        image,
        phoneNumber,
        linkedinUrl,
        location,
        cvUrl,
      },
    });

    revalidatePath("/dashboard/users");
    revalidatePath(`/dashboard/users/${userId}`);
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: { id: userId },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getUser(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        aboutMe: true,
        whatIDo: true,
        education: true,
        workExperience: true,
        projects: {
          include: {
            technologies: true,
          },
        },
        contact: true,
        mySkills: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: (error as Error).message };
  }
}
