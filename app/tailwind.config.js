module.exports = {
  content: ['./*.html', './src/**/*.{css,tsx}'],
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
};
