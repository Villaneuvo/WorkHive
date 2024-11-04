/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                "8xl": "90rem",
            },
            colors: {
                "reseda-green": "#5B7C5B",
                platinum: "#E4E4E4",
                "erie-black": "#191919",
                primary: {
                    dark: "#3D583D",
                    DEFAULT: "#5B7C5B",
                    light: "#8FA98F",
                },
            },
            animation: {
                "spin-once": "spin-once 1s ease-in-out forwards",
                "pulse-once": "pulse-once 1s ease-in-out forwards",
            },
            keyframes: {
                "spin-once": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "pulse-once": {
                    "0%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
