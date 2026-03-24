import React from "react";
import Link from "next/link";

interface EventCardProps {
  id: string;
  title: string;
  price: number;
  date: string;
  location: string;
  imageUrl: string;
  tag?: string;
}

export function EventCard({ id, title, price, date, location, imageUrl, tag }: EventCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 shadow-sm border border-outline-variant/10">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={imageUrl} 
        />
        <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-lg text-primary-dim font-bold text-sm shadow-sm">
          {price === 0 ? "Free" : `$${price}`}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error hover:scale-110 transition-transform shadow-sm">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold font-headline text-on-surface">{title}</h3>
          {tag && (
            <span className="text-xs font-bold bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>
        <p className="text-sm text-on-surface-variant font-medium font-body">{date} • {location}</p>
        <div className="pt-3">
          <Link 
            href={`/events/${id}`}
            className="block w-full text-center py-2.5 bg-surface-container-low text-primary font-bold rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
