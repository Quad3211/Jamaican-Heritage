# Setup Instructions — Jamaican Heritage

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MySQL** 8+ (local or cloud)
- **Angular CLI** 14 (`npm i -g @angular/cli@14`)

---

## 1. Database Setup

```bash
# Log into MySQL
mysql -u root -p

# Run the schema script
source database/schema.sql
```

This creates the `jamaican_heritage_db` database, all tables, and seeds 10 sample products.

---

## 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env from template
cp .env.example .env

# Edit .env with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=jamaican_heritage_db
# JWT_SECRET=change_this_to_a_random_secret

# Start in development mode
npm run dev
```

The API will be available at `http://localhost:3000`.

Test the health endpoint:

```bash
curl http://localhost:3000/api/health
```

---

## 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Angular dev server
ng serve
```

The app will be available at `http://localhost:4200`.

---

## 4. Production Build (Frontend)

```bash
cd frontend
ng build --configuration production
```

Output goes to `frontend/dist/frontend/`.

---

## 5. Deploy to Netlify

1. Push the `frontend/` folder to a Git repository.
2. In Netlify, create a new site → connect repo → set:
   - **Base directory:** `frontend`
   - **Build command:** `ng build --configuration production`
   - **Publish directory:** `frontend/dist/frontend`
3. Deploy triggers automatically on push.

The `netlify.toml` in `frontend/` handles SPA routing redirects and security headers.

---

## 6. Deploy Backend

### Option A — Railway

1. Push the `backend/` folder to a separate Git repo (or monorepo with root set to `backend`).
2. In Railway, create a new project → deploy from repo.
3. Add environment variables from `.env.example`.
4. Railway assigns a public URL — update `environment.prod.ts` in the frontend with this URL.

### Option B — Render

1. Create a new Web Service on Render → connect repo.
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variables.

---

## 7. Connect Frontend ↔ Backend

Update `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: "https://YOUR_BACKEND_URL/api",
};
```

Update the backend `.env` `CORS_ORIGINS` to include your Netlify URL.
