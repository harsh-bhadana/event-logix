"use server";

import dbConnect from "@/lib/mongodb";
import AuditLog from "@/models/AuditLog";
import { getSession } from "@/lib/auth";

export interface CreateAuditLogInput {
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}

export async function logAdminAction(input: CreateAuditLogInput) {
  try {
    await dbConnect();
    const session = await getSession();
    
    let actorId = null;
    let actorEmail = "system@eventlogix.com";

    if (session?.user) {
      actorId = session.user.id;
      actorEmail = session.user.email;
    }

    const logEntry = new AuditLog({
      actor: actorId,
      actorEmail,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      details: input.details || {},
      ipAddress: input.ipAddress
    });

    await logEntry.save();
    return { success: true };
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return { success: false, error };
  }
}

export async function getAuditLogs(filters?: {
  action?: string;
  actorEmail?: string;
  targetType?: string;
}) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const query: any = {};
    if (filters?.action) {
      query.action = filters.action;
    }
    if (filters?.actorEmail) {
      query.actorEmail = { $regex: filters.actorEmail, $options: 'i' };
    }
    if (filters?.targetType) {
      query.targetType = filters.targetType;
    }

    const logs = await AuditLog.find(query)
      .populate('actor', 'name email role')
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(logs))
    };
  } catch (error: any) {
    console.error("Failed to fetch audit logs:", error);
    return { success: false, error: error.message || "Failed to fetch audit logs" };
  }
}
