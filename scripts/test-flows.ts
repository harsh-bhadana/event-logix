import { execSync } from "child_process";
import path from "path";

function run() {
  console.log("==================================================");
  console.log("🚀 STARTING THREE-WAY EVENT LOGIX FLOW VALIDATION");
  console.log("==================================================\n");

  try {
    // Step 1: Seed the database
    console.log("👉 Step 1: Seeding users and test events in MongoDB...");
    const seedPath = path.resolve(__dirname, "./seed-db.ts");
    execSync(`npx tsx "${seedPath}"`, { stdio: "inherit" });
    console.log("\n✅ Database seeding completed successfully!\n");

    // Step 2: Run Flow Integration Tests
    console.log("👉 Step 2: Running end-to-end user flows integration tests...");
    const testPath = path.resolve(
      __dirname,
      "../src/lib/actions/__tests__/integration-flows.test.ts"
    );
    execSync(`npx vitest run "${testPath}"`, { stdio: "inherit" });
    console.log("\n✅ All three user flows verified successfully against the live database!\n");

    console.log("==================================================");
    console.log("🎉 SUCCESS: All flows validated and operational!");
    console.log("==================================================");
  } catch (error: any) {
    console.error("\n❌ Validation Failed!");
    console.error(error.message);
    process.exit(1);
  }
}

run();
