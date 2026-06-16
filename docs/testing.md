# Testing Framework & Guidelines: Event Logix

This document details the testing environment, mocking standards, and commands for running unit tests in **Event Logix**.

---

## 🧪 Testing Environment

We use **Vitest** alongside **jsdom** for fast, isolated unit testing:
- **Framework**: Vitest (compatible with Jest matchers and configuration).
- **Environment**: `jsdom` (simulates browser API globals like `Request`, `Response`, `Blob`, and `FormData` in Node).
- **Alias Resolution**: Path mapping `@/*` translates directly to `./src/*` matching Next.js configuration.

---

## 🏃 Running Tests

You can execute the test suites using the following commands:

```bash
# Run all tests once
npx vitest run

# Run tests in interactive watch mode (re-runs modified files)
npx vitest

# Run tests with test coverage reporting
npx vitest run --coverage
```

---

## ✍️ Writing & Mocking Tests

### 1. Mocking Database Models
Since database connections shouldn't be established during unit tests, mock models at the top of test files:

```typescript
import { vi } from 'vitest';
import Booking from '@/models/Booking';

// Mock Mongoose collections
vi.mock('@/models/Booking');

// Mock connection helpers
vi.mock('@/lib/mongodb', () => ({
  default: vi.fn().mockResolvedValue(true)
}));
```

### 2. Mocking Native Form Data & File API
In Node.js, native `Request` parsers assert strict type checks on files. To test upload actions:
1. Construct standard `Blob` instances:
   ```typescript
   const mockFile = new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" });
   ```
2. Build mock requests with a custom `formData` resolver:
   ```typescript
   const mockRequest = {
     formData: async () => {
       const fd = new FormData();
       fd.append("file", mockFile, "test.png"); // third argument specifies filename
       return fd;
     }
   } as unknown as Request;
   ```
