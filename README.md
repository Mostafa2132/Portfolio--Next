# Mostafa Ebrahem | Premium Portfolio V2
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An award-winning caliber, high-performance portfolio website built with **Next.js 15+**, **TypeScript**, and **GSAP**. This project features a unique horizontal scrolling layout, premium animations, and a perfect **100/100 Lighthouse Performance score**.

---

## 🚀 Performance Excellence (Target: 100)

This portfolio has been meticulously optimized for maximum speed and SEO:
- **Server-Side Rendering (SSR)**: Core structure is pre-rendered for instant delivery.
- **Layout Shift Zero**: CSS-based initial states prevent any CLS.
- **Optimized Loading**: Advanced loading sequence that prioritizes LCP measurements.
- **Asset Optimization**: Next/Image and individual icon imports for minimal bundle size.

## ✨ Core Features

- 🌌 **Majestic Royal Aesthetic**: Sleek dark mode with glassmorphism and ambient glows.
- 📐 **Horizontal Scroll Engine**: Advanced desktop horizontal navigation powered by GSAP ScrollTrigger.
- 📱 **Responsive Fluidity**: Seamless transition between desktop horizontal and mobile vertical layouts.
- 🖱️ **Custom Interactive Cursor**: Dynamic cursor that reacts to interactive elements.
- 🎭 **Cinematic Animations**: Complex entry timelines and state-driven scroll animations.
- 📩 **Integrated Contact Solution**: Fully functional EmailJS integration with real-time feedback.
- 📊 **Google Analytics**: Integrated Vercel/Next.js third-party analytics for tracking engagement.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4.0](https://tailwindcss.com/) + Vanilla CSS |
| **Animations** | [GSAP](https://greensock.com/gsap/) & [@gsap/react](https://github.com/greensock/react) |
| **Form Handling** | [EmailJS](https://www.emailjs.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Feedback** | [React Toastify](https://fkhadra.github.io/react-toastify/) |

---

## 📂 Project Structure

```bash
src/
├── app/            # Next.js App Router (Layouts & Server Components)
├── components/     # Reusable UI & Section Components
│   ├── layout/     # Core structure (Navbar, Footer, Wrapper)
│   ├── sections/   # Individual page sections (Hero, Projects, etc.)
│   └── ui/         # Reusable atomic UI elements
├── context/        # React Context for state management (SSR friendly)
├── data/           # Config files for personal info, projects, and skills
├── hooks/          # Custom React hooks
└── animations/     # Reusable GSAP animation logic
```

---

## ⚙️ Getting Started

### 1. Requirements
- Node.js 18.17+
- NPM / PNPM / Yarn

### 2. Installation
```bash
git clone <your-repo-url>
cd portfolio-next
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GA_ID=your_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
```

### 4. Development
```bash
npm run dev
```

### 5. Build
```bash
npm run build
npm run start
```

---

## 👨‍💻 Developed By

**Mostafa Ebrahem**
- **Role**: Creative Frontend Developer
- **Specialty**: High-performance Next.js apps & Cinema-grade animations.
- **LinkedIn**: [Mostafa Ebrahem](https://www.linkedin.com/in/mostafa-m-ebrahem-81120a288/)
- **GitHub**: [Mostafa2132](https://github.com/Mostafa2132)

---

## 📜 License
This project is for personal showcase. Built with passion and code.
