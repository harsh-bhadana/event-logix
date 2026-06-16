# Deployment & Configuration: Event Logix

This guide covers step-by-step instructions to deploy **Event Logix** to Vercel and configure its cloud dependencies.

---

## 🚀 Deployment Steps

### 1. Set Up MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist all IPs (`0.0.0.0/0`) or Vercel's IP ranges.
3. Copy the database connection string: `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/event-logix?retryWrites=true&w=majority`.

### 2. Deploy to Vercel
1. Import your repository into [Vercel Dashboard](https://vercel.com).
2. In the **Environment Variables** configuration section, set up the mandatory variables (see below).
3. Click **Deploy**.

---

## ⚙️ Environment Variables

The application validates variables on startup using Zod in [env.ts](file:///g:/Projects/event-logix/src/lib/env.ts).

### Mandatory Variables
- `MONGODB_URI`: The connection string to your MongoDB Atlas database.
- `JWT_SECRET`: A 32-character random string used to sign session cookies. You can generate one via terminal:
  ```bash
  openssl rand -base64 32
  ```

### Optional Variables (For Cloud Features)
- `BLOB_READ_WRITE_TOKEN`: Enable Vercel Blob Storage. To generate this:
  1. Go to your Vercel project dashboard.
  2. Select the **Storage** tab.
  3. Create a **Blob** store and connect it to your project. Vercel automatically injects `BLOB_READ_WRITE_TOKEN` into your production environments.
- `CRON_SECRET`: Required to secure the Vercel Cron endpoint. Vercel automatically injects this secret when crons are configured.

---

## ⏰ Vercel Cron Jobs Configuration

The platform defines a cron job to send upcoming event reminders daily.

### Configuration (`vercel.json`)
The root configuration maps the cron to run daily:
```json
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "0 17 * * *"
  }]
}
```

### Authorization
To prevent unauthorized users from executing `/api/cron`, the endpoint matches the `Authorization: Bearer <CRON_SECRET>` header. Vercel includes this header automatically on cron schedules.
