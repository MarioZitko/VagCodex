/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F8',
        surface: '#FFFFFF',
        divider: '#E8E8EA',
        primary: '#111111',
        secondary: '#6B6B6B',
        muted: '#AAAAAA',
        accent: {
          DEFAULT: '#1C3557',
          light: '#EDF2F8',
        },
        danger: '#C0392B',
        success: '#2D6A4F',
      },
    },
  },
  plugins: [],
};
