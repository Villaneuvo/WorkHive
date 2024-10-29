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
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
