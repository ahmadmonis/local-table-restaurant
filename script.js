// The Local Table — restaurant interactions
// Replace this with the real restaurant WhatsApp number (country code, digits only).
const WHATSAPP_NUMBER = "919876543210";

const wa = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const setWhatsApp = (id, message) => {
  const el = document.getElementById(id);
  if (el) el.href = wa(message);
};

setWhatsApp("heroWhatsapp", "Hi! I'd like to book a table at The Local Table.");
setWhatsApp("offerWhatsapp", "Hi! I'd like to claim the 20% Weekend Special at The Local Table.");
setWhatsApp("ctaWhatsapp", "Hi! I'd like to book a table at The Local Table.");
setWhatsApp("ctaGeneralWhatsapp", "Hi The Local Table! I'd like to ask about your menu.");
setWhatsApp("footerWhatsapp", "Hi The Local Table! I'd like to contact the restaurant.");
setWhatsApp("floatingWhatsapp", "Hi The Local Table! I'd like to make an enquiry.");

document.querySelectorAll(".order-btn").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    window.open(wa(`Hi! I'd like to order ${item}. Please share the details.`), "_blank", "noopener,noreferrer");
  });
});

// Menu category filter
const categoryButtons = document.querySelectorAll(".category");
const foodCards = document.querySelectorAll(".food-card");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    foodCards.forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Close mobile menu when tapping outside it.
document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active navigation section
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-menu > a:not(.nav-cta)");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

// Reading progress
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });
