# Security Explanation — Jamaican Heritage

## 1. Password Hashing (bcrypt)

All passwords are hashed with **bcrypt** (12 salt rounds) before storage. Plain-text passwords are never stored or logged. bcrypt's adaptive hashing makes brute-force attacks computationally expensive.

## 2. JWT Authentication

- JSON Web Tokens are issued upon login/register with a configurable expiry (default: 7 days).
- Tokens contain the user's `id`, `name`, and `email` — never the password.
- The Angular `JwtInterceptor` automatically attaches the Bearer token to every outgoing API request.
- The `AuthGuard` prevents unauthenticated access to protected routes on the frontend.

## 3. Helmet Security Headers

The `helmet` middleware sets HTTP headers that help protect against common web vulnerabilities:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- `X-XSS-Protection`
- Content Security Policy defaults

## 4. Rate Limiting

- **Global:** 100 requests per 15 minutes per IP address.
- **Auth endpoints:** 10 requests per 15 minutes to prevent brute-force login attacks.

## 5. CORS Protection

- Only explicitly whitelisted origins can make requests to the API.
- Configured via `CORS_ORIGINS` environment variable.

## 6. Input Validation & Sanitisation

- All user inputs are validated using `express-validator`.
- Email addresses are normalised, fields are trimmed, and lengths are constrained.
- SQL queries use parameterised statements (`?` placeholders) to prevent SQL injection.

## 7. CSRF & XSS Prevention

- The API is stateless (JWT, no cookies/sessions) which avoids traditional CSRF vectors.
- `helmet` sets headers to mitigate XSS.
- Angular's built-in template sanitisation protects against DOM-based XSS.

## 8. HTTPS

- Netlify provides automatic SSL for the frontend.
- Backend platforms (Railway, Render) provide automatic HTTPS.
- All API communication occurs over encrypted connections in production.

## 9. Server-Side Price Calculation

Product prices are **always fetched from the database** when creating an order — never trusted from the client. This prevents price manipulation attacks.
