// Timeloop Games - Navigation, Interactions & Notifications

(function () {
    "use strict";

    // ==============================
    // NOTIFICATION PERMISSION + "HIII"
    // ==============================
    function askForNotifications() {
        // Check browser support
        if (!("Notification" in window)) {
            console.log("Notifications are not supported in this browser.");
            return;
        }

        // Request permission
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("HIII", {
                    body: "Thanks for enabling notifications!",
                    icon: "icon.png" // optional — remove if you don't have an icon
                });
            } else {
                console.log("Notification permission denied.");
            }
        });
    }

    // Ask shortly after page load
    window.addEventListener("load", function () {
        setTimeout(askForNotifications, 600);
    });

    // ==============================
    // MOBILE NAVIGATION TOGGLE
    // ==============================
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navToggle.classList.toggle("active");
            navLinks.classList.toggle("open");
            document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                navToggle.classList.remove("active");
                navLinks.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // ==============================
    // NAVBAR SCROLL EFFECT
    // ==============================
    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }, { passive: true });
    }

    // ==============================
    // SMOOTH SCROLL FOR ANCHORS
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ==============================
    // SCROLL REVEAL ANIMATIONS
    // ==============================
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    if (animateElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        animateElements.forEach(function (el) {
            observer.observe(el);
        });
    }

})();

