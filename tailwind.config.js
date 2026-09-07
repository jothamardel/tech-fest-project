/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Tailwind v4 — design tokens live in globals.css via @theme {}
  // This file is retained only for content scanning.
};
