import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../src/lib/mongodb";
import User from "../src/models/User";
import bcrypt from "bcryptjs";

async function seedCredentials() {
  await dbConnect();
  const passwordHash = await bcrypt.hash("password123", 10);

  const users = [
    {
      name: "Test Admin",
      email: "admin@test.com",
      password: passwordHash,
      role: "admin",
    },
    {
      name: "Test Staff",
      email: "staff@test.com",
      password: passwordHash,
      role: "staff",
      staffProfile: {
        isVerified: true,
        onboardingStatus: "approved",
      },
    },
    {
      name: "Test Public",
      email: "user@test.com",
      password: passwordHash,
      role: "public",
    },
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      existing.password = passwordHash;
      existing.role = u.role as "admin" | "staff" | "public";
      await existing.save();
      console.log(`Updated existing user: ${u.email}`);
    } else {
      await User.create(u);
      console.log(`Created user: ${u.email}`);
    }
  }

  console.log("Credentials seeded! Password for all is: password123");
  process.exit(0);
}

seedCredentials().catch(console.error);
