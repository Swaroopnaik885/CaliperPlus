// Section Reveal Animation
(() => {
    const elements = document.querySelectorAll(".reveal");
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const update = () => {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 3.5;
            const start = viewportHeight * 1.25;
            const end = viewportCenter * 0.8;
            let progress = (start - elementCenter) / (start - end);
            progress = clamp(progress, 0, 1);
            const eased = easeOutQuart(progress);
            el.style.opacity = eased;
            el.style.transform = `
                translateY(${60 - 60 * eased}px)
                scale(${0.95 + 0.05 * eased})
            `;
            el.style.filter = `blur(${10 - 10 * eased}px)`;
        });
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
})();



// Hover Details Toggle
const details = document.getElementById("Hover-Details");

details.addEventListener("mouseenter", () => {
  details.setAttribute("open", true);
});
document.addEventListener("mousedown", (event) => {
  if (!details.contains(event.target)) {
    details.open = false;
  }
});


// Service Page Button Navigation
const serviceIDs = ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7"];

serviceIDs.forEach(id => {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("click", () => {
            window.location.href = "Service.html";
        });
    }
});