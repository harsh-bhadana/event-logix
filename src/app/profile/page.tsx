import React from 'react';
import { getSession } from '@/lib/auth';
import { AdaptiveProfileForm } from '@/components/profile/AdaptiveProfileForm';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user) return <div>Unauthorized</div>;

  await dbConnect();
  const user = await User.findById(session.user.id).lean();
  
  if (!user) return <div>User not found</div>;

  const userData = JSON.parse(JSON.stringify(user));

  return (
    <div className="px-10 py-12 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] bg-surface-container-high border-4 border-white shadow-xl overflow-hidden">
            {userData.staffProfile?.profileImage ? (
              <Image src={userData.staffProfile.profileImage} width={128} height={128} alt={userData.name} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="material-symbols-outlined text-5xl text-primary">person</span>
              </div>
            )}
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-on-surface text-on-primary rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-sm">photo_camera</span>
          </button>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline italic">{userData.name}</h1>
          <p className="text-on-surface-variant font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
            <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
              {userData.role}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant/30" />
            <span className="text-sm">Member since {new Date(userData.createdAt).getFullYear()}</span>
          </p>
        </div>
      </div>

      <AdaptiveProfileForm user={userData} />
    </div>
  );
}
