/*
  eslint-disable
  @typescript-eslint/no-var-requires
*/

import { fontFamily, screens } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rubik)', ...fontFamily.sans],
      },
    },
    screens: {
      'xs': '475px',
      'nav-logo-cutoff': { max: '757px', min: '641px' },
      ...screens,
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: 'class' })],
  variants: {
    outline: ["focus"],
  },
}

