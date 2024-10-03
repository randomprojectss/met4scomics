// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode; // Toggle the mode
    document.body.classList.toggle('dark-mode', isDarkMode); // Add/remove dark mode class
    themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'; // Update button text
});
