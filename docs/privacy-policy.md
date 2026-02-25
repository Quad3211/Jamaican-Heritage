# Privacy Policy — Jamaican Heritage

**Last updated:** February 2026

## 1. Information We Collect

We collect the minimum personal information necessary to provide our services:

- **Account data:** Name, email address
- **Authentication:** Password (stored as a bcrypt hash — never in plain text)
- **Order data:** Items purchased, order totals, timestamps

We do **not** collect:

- Payment card details (no payment gateway is integrated)
- Location data
- Browsing history or analytics

## 2. How We Use Your Data

| Purpose                  | Data Used                   |
| ------------------------ | --------------------------- |
| Account creation & login | Name, email, password hash  |
| Order processing         | User ID, product selections |
| Customer support         | Email address               |

We will **never** sell, rent, or share your personal information with third parties.

## 3. Data Storage & Security

- All data is stored in an **encrypted MySQL database**.
- Passwords are hashed with **bcrypt** (12 salt rounds).
- Authentication uses **JWT tokens** with configurable expiry.
- API communication is secured via **HTTPS**.
- Backend is protected by **Helmet** security headers and **rate limiting**.

## 4. Cookies & Local Storage

We use only **essential browser storage** (localStorage):

| Key         | Purpose                  |
| ----------- | ------------------------ |
| `jam_token` | JWT authentication token |
| `jam_user`  | Cached user profile      |
| `jam_cart`  | Shopping cart contents   |

No third-party tracking cookies or analytics scripts are used.

## 5. Your Rights

You may at any time:

- **Access** your personal data via the Profile page
- **Correct** your name or email via the Profile page
- **Request deletion** of your account by contacting us

## 6. Data Retention

We retain your data for as long as your account is active. If you request account deletion, all personal data will be removed within 30 days.

## 7. Consent

By creating an account, you consent to the collection and use of information as described in this policy.

## 8. Contact

For privacy-related enquiries:

- **Email:** hello@jamaicanheritage.com
- **Address:** 12 King Street, Kingston, Jamaica
