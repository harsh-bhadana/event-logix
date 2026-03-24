"use server";

import dbConnect from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { revalidatePath } from "next/cache";

/**
 * Fetch notifications for a specific user
 */
export async function getNotifications(userId: string) {
  try {
    await dbConnect();
    const notifications = await Notification.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .limit(20);
    return JSON.parse(JSON.stringify(notifications));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string) {
  try {
    await dbConnect();
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    // Revalidate paths where notifications might be shown
    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false };
  }
}

/**
 * Create a new notification
 */
export async function createNotification(userId: string, data: { title: string; message: string; type?: string; link?: string }) {
  try {
    await dbConnect();
    const newNotification = await Notification.create({
      recipientId: userId,
      ...data
    });
    return JSON.parse(JSON.stringify(newNotification));
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
}

/**
 * Mark all as read
 */
export async function markAllAsRead(userId: string) {
  try {
    await dbConnect();
    await Notification.updateMany({ recipientId: userId, read: false }, { read: true });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error marking all as read:", error);
    return { success: false };
  }
}
