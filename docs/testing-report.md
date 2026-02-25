# Testing Report — Jamaican Heritage

## Test Scenarios

### 1. User Registration

| Test               | Input                              | Expected Result      | Status |
| ------------------ | ---------------------------------- | -------------------- | ------ |
| Valid registration | Name, valid email, strong password | 201, JWT returned    | 🔲     |
| Duplicate email    | Existing email                     | 409 error            | 🔲     |
| Weak password      | `pass`                             | 422 validation error | 🔲     |
| Missing fields     | Empty body                         | 422 validation error | 🔲     |

### 2. User Login

| Test              | Input                     | Expected Result   | Status |
| ----------------- | ------------------------- | ----------------- | ------ |
| Valid login       | Correct credentials       | 200, JWT returned | 🔲     |
| Wrong password    | Correct email, wrong pass | 401 error         | 🔲     |
| Non-existent user | Unknown email             | 401 error         | 🔲     |

### 3. Protected Routes

| Test                            | Condition      | Expected Result    | Status |
| ------------------------------- | -------------- | ------------------ | ------ |
| Access /dashboard without token | Not logged in  | Redirect to /login | 🔲     |
| Access /cart without token      | Not logged in  | Redirect to /login | 🔲     |
| API call without Bearer token   | No auth header | 401 JSON response  | 🔲     |
| API call with expired token     | Expired JWT    | 401 JSON response  | 🔲     |

### 4. Product Browsing

| Test            | Action               | Expected Result              | Status |
| --------------- | -------------------- | ---------------------------- | ------ |
| Load shop page  | Navigate to /shop    | Products displayed in grid   | 🔲     |
| Category filter | Click "Food & Drink" | Only food items shown        | 🔲     |
| Search          | Type "coffee"        | Matching products shown      | 🔲     |
| Product detail  | Click product card   | Detail page with description | 🔲     |

### 5. Cart & Order

| Test            | Action                | Expected Result                     | Status |
| --------------- | --------------------- | ----------------------------------- | ------ |
| Add to cart     | Click "Add to Cart"   | Item appears in cart, badge updates | 🔲     |
| Update quantity | Increase/decrease qty | Subtotal recalculates               | 🔲     |
| Remove item     | Click remove (✕)      | Item removed from cart              | 🔲     |
| Place order     | Click "Place Order"   | Order created, cart cleared         | 🔲     |
| Order history   | Navigate to /orders   | Past orders displayed               | 🔲     |

### 6. Profile Management

| Test            | Action                   | Expected Result             | Status |
| --------------- | ------------------------ | --------------------------- | ------ |
| Load profile    | Navigate to /profile     | Name and email populated    | 🔲     |
| Update name     | Change name, submit      | Success message, name saved | 🔲     |
| Duplicate email | Change to existing email | 409 error                   | 🔲     |

### 7. Mobile Responsiveness

| Test         | Screen Width | Expected Result                      | Status |
| ------------ | ------------ | ------------------------------------ | ------ |
| Navigation   | 375 px       | Hamburger menu visible, drawer opens | 🔲     |
| Product grid | 375 px       | Single-column layout                 | 🔲     |
| Forms        | 375 px       | Full-width inputs, readable text     | 🔲     |
| Cart page    | 375 px       | Stacked layout (items above summary) | 🔲     |

### 8. Cross-Browser Compatibility

| Browser | Version | Status |
| ------- | ------- | ------ |
| Chrome  | Latest  | 🔲     |
| Firefox | Latest  | 🔲     |
| Safari  | Latest  | 🔲     |
| Edge    | Latest  | 🔲     |

### 9. Lighthouse Benchmarks

| Metric         | Target | Score | Status |
| -------------- | ------ | ----- | ------ |
| Performance    | ≥ 85   | —     | 🔲     |
| Accessibility  | ≥ 90   | —     | 🔲     |
| Best Practices | ≥ 95   | —     | 🔲     |
| SEO            | ≥ 80   | —     | 🔲     |

> 🔲 = Not yet tested | ✅ = Passed | ❌ = Failed

## Notes

- All API tests can be executed manually via `curl` or Postman once the backend and database are running.
- Lighthouse tests should be run against the Netlify production deployment.
- Cross-browser tests should cover the full user flow: register → login → shop → add to cart → checkout → view orders.
