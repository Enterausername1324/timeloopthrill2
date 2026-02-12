// Timeloop Games - Navigation & Interactions

(function () {
    "use strict";

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navToggle.classList.toggle("active");
            navLinks.classList.toggle("open");
            document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                navToggle.classList.remove("active");
                navLinks.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById("navbar");

    if (navbar) {
        var lastScroll = 0;

        window.addEventListener("scroll", function () {
            var currentScroll = window.scrollY;

            if (currentScroll > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // --- Smooth scroll for internal anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // --- Scroll reveal animations ---
    var animateElements = document.querySelectorAll(".animate-on-scroll");

    if (animateElements.length > 0 && "IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
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
