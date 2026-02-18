// Timeloop Thrill - Navigation, Interactions, Secrets & Daily Notifications

(function () {
    "use strict";

    // ==============================
    // DAILY NOTIFICATION SYSTEM
    // ==============================
    function showDailyNotification() {
        if (!("Notification" in window)) return;

        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        if (Notification.permission !== "granted") return;

        const lastShown = localStorage.getItem("lastNotificationTime");
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (!lastShown || now - lastShown > oneDay) {
            new Notification("HIII", {
                body: "Thanks for visiting Timeloop Thrill!",
                icon: "icon.png"
            });

            localStorage.setItem("lastNotificationTime", now);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(showDailyNotification, 600);
    });

    // ==============================
    // WAIT FOR DOM TO LOAD
    // ==============================
    document.addEventListener("DOMContentLoaded", () => {

        // ==============================
        // SECRET BUTTON ("???")
        // ==============================
        const secretButton = document.getElementById("secretButton");

        if (secretButton) {
            secretButton.addEventListener("click", () => {
                alert("Enter the Konami Code");

                // Show mobile Konami panel
                const panel = document.getElementById("konamiPanel");
                if (panel) panel.style.display = "flex";
            });
        }

        // ==============================
        // KONAMI CODE (Keyboard + Mobile)
        // ==============================
        let konami = [];
        const konamiCode = [
            "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
            "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"
        ];

        function checkKonami() {
            if (JSON.stringify(konami) === JSON.stringify(konamiCode)) {
                window.location.href = "secret.html";
            }
        }

        // Keyboard support
        window.addEventListener("keydown", (e) => {
            konami.push(e.key);

            if (konami.length > konamiCode.length) {
                konami.shift();
            }

            checkKonami();
        });

        // Mobile tap support
        const mobileButtons = document.querySelectorAll(".konami-btn");
        mobileButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                konami.push(btn.dataset.key);

                if (konami.length > konamiCode.length) {
                    konami.shift();
                }

                checkKonami();
            });
        });

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
