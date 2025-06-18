# Fashionista - Modern Fashion Store

> **Note:** This app was built solely by AI and is for demonstration purposes only. Not intended for production use.

Fashionista is a modern, visually stunning fashion store web application built with Express.js, HTML, and CSS. It features a beautiful landing page, product catalog, shopping cart functionality, and a responsive, mobile-friendly design. This project is ideal for learning full-stack web development and e-commerce best practices.

---

## 🚀 Features
- Multi-page app: landing, products, contact, cart
- Shopping cart with persistent localStorage, modal UI, INR currency
- Hero image, featured brands, testimonials, modern footer
- 30+ high-quality products with images
- Checkout button and cart management
- Backend in `server/`, static files in `public/`, tests in `tests/`
- `.env` support, security middleware (`helmet`, `cors`), centralized error handling, Winston logging
- Linting (ESLint), formatting (Prettier), pre-commit hooks (Husky, lint-staged)
- Unit tests (Jest, Supertest), coverage reporting
- CI/CD via GitHub Actions (lint, test, build, Docker push), CODEOWNERS
- Dockerfile (Podman compatible), `.containerignore`
- Swagger UI at `/api/docs` (only JSON APIs documented, e.g., `/version`)
- CSP for Unsplash images

## 🛠️ Tech Stack
- Node.js, Express.js
- HTML5, CSS3 (custom, no frameworks)
- JavaScript (ES6+)
- Docker/Podman
- Jest, Supertest (testing)
- ESLint, Prettier, Husky

## 🏁 Getting Started

### Local Development
1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd demo-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** (see `.env.example`)
4. **Run locally**
   ```bash
   npm start
   ```
5. **Visit** [http://localhost:3000](http://localhost:3000)

### Containerized (Podman/Docker)
1. **Build the image**
   ```bash
   podman build -t demo-app .
   # or
docker build -t demo-app .
   ```
2. **Run the container**
   ```bash
   podman run -p 3000:3000 demo-app
   # or
docker run -p 3000:3000 demo-app
   ```

## 📂 Project Structure
```
demo-app/
  public/         # Static HTML, CSS, JS
  server/         # Express backend
  tests/          # Jest/Supertest tests
  Dockerfile      # Container build
  README.md       # This file
```

## 📝 License
Demo only. Not for production use.
