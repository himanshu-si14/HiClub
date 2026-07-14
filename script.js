// Automatically update the year in the footer so it's always current
document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});