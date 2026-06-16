import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required").url("MONGODB_URI must be a valid URL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  CRON_SECRET: z.string().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().optional(),
});

// Validate process.env on startup
const parseEnv = () => {
  const isBuildTime = 
    process.env.NEXT_PHASE === "phase-production-build" || 
    process.env.SKIP_ENV_VALIDATION === "true";

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    if (isBuildTime) {
      console.warn("⚠️ Warning: Missing environment variables during build phase (bypassed):");
      // Return placeholders so Next.js static optimization does not crash
      return {
        MONGODB_URI: "mongodb://localhost:27017/showcase-placeholder",
        JWT_SECRET: "placeholder-jwt-secret-must-be-long-enough-to-be-secure",
      } as any;
    }

    console.error("❌ Invalid environment configuration:");
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error("Invalid environment configuration. Check logs for details.");
  }

  return result.data;
};

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
