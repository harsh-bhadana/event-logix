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
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 17 * * *"
    }
  ]
}
```

### Authorization

To prevent unauthorized users from executing `/api/cron`, the endpoint matches the `Authorization: Bearer <CRON_SECRET>` header. Vercel includes this header automatically on cron schedules.

---

## 🔑 Google Sign-In Configuration

The platform supports Sign In with Google for attendee auto-registration and authentication.

### Setup Instructions

1. Go to the [Google Cloud Console](https://console.cloud.google.com).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > OAuth consent screen**. Configure the consent screen for external users and add requested scopes (`email` and `profile`).
4. Go to **Credentials**, click **Create Credentials**, and select **OAuth client ID**.
5. Set the **Application type** to "Web application".
6. Add your authorized redirect URIs:
   - **Local Development**: `http://localhost:3000/api/auth/callback/google`
   - **Production**: `https://your-domain.vercel.app/api/auth/callback/google`
7. Copy the generated **Client ID** and **Client Secret**.
8. Configure the following environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
