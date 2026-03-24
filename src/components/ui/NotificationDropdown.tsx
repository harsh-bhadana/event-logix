"use client";

import React, { useState, useEffect } from "react";
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead 
} from "@/lib/actions/notification-actions";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export function NotificationDropdown({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    const data = await getNotifications(userId);
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await markAsRead(id);
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead(userId);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return "check_circle";
      case "warning": return "warning";
      case "error": return "error";
      default: return "info";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors p-2 rounded-full active:opacity-80"
      >
        <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-neutral-900 border border-outline-variant shadow-xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline font-bold text-on-surface">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-on-surface-variant text-sm">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-sm">No notifications yet</div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    key={notif._id}
                    className={`p-4 border-b border-outline-variant/5 hover:bg-surface-container hover:dark:bg-neutral-800 transition-colors cursor-pointer relative ${!notif.read ? 'bg-primary/5' : ''}`}
                    onClick={() => {
                      if (notif.link) window.location.href = notif.link;
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex gap-3">
                      <span className={`material-symbols-outlined text-xl ${
                        notif.type === 'success' ? 'text-green-500' : 
                        notif.type === 'warning' ? 'text-amber-500' : 
                        notif.type === 'error' ? 'text-red-500' : 'text-primary'
                      }`}>
                        {getIcon(notif.type)}
                      </span>
                      <div className="flex-1">
                        <p className={`text-sm ${!notif.read ? 'font-bold' : 'font-medium'} text-on-surface`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-on-surface-variant/60 mt-2">
                          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      {!notif.read && (
                        <button 
                          onClick={(e) => handleMarkAsRead(notif._id, e)}
                          className="w-2 h-2 bg-primary rounded-full mt-1.5"
                          title="Mark as read"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-surface-container-low dark:bg-neutral-800 text-center">
              <button className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
                View all activity
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
