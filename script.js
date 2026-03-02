// Timeloop Thrill - Navigation, Interactions, Secrets & Daily Notifications
(function () {
    "use strict";
// ==============================
    // ANTI-CLOSE (BEFOREUNLOAD)
    // ==============================
    window.addEventListener("beforeunload", function (e) {
        // This is the standard way to trigger the "Leave site?" browser popup
        e.preventDefault();
        
        // Modern browsers require setting returnValue to a string
        // Note: Most browsers ignore the custom text and show their own default message
        e.returnValue = "Are you sure you want to exit the Timeloop?";
        return e.returnValue;
    });
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
    // BASE64 SECRET CODE PROMPT
    // ==============================
    document.addEventListener("DOMContentLoaded", () => {
        const secretButton = document.getElementById("secretButton");

        if (secretButton) {
            secretButton.addEventListener("click", () => {
                const code = prompt("Enter the secret code:");

                // We encode the user's input and compare it to our hidden string
                // "donate100" -> "ZG9uYXRlMTAw"
                // "secret.html" -> "c2VjcmV0Lmh0bWw="
                
                if (code !== null && btoa(code) === "ZG9uYXRlMTAw") {
                    window.location.href = atob("c2VjcmV0Lmh0bWw=");
                } else if (code !== null) {
                    alert("Incorrect code. The timeline remains locked.");
                }
            });
        }
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

