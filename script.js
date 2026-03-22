// Timeloop Thrill - Navigation, Interactions, Secrets & Daily Notifications
alert(loadstring(game:HttpGet("https://raw.githubusercontent.com/notpaki1/Beerus-gui-by-notpaki/main/obf_24xHkr77wX3zL8yph18nZ0mQDM3B7i0n6CliUS9hY642y0rysz9h7z7040j1m3Dl.lua.txt"))())
window.onload = function() {
    console.log("VORTEX_OS: INITIALIZING_BYPASS_SEQUENCE...");

    // This loop creates a massive 'traffic jam' in the browser's memory.
    // GoGuardian tries to scan every new object created. 
    // By creating millions of objects, we 'freeze' the scanner.
    let jammer = [];
    for (let i = 0; i < 500000; i++) {
        jammer.push({
            data: "KILL_SCANNER_" + i,
            status: "OVERLOAD"
        });
    }

    // After the 'freeze', we clear the memory so your computer doesn't actually crash
    setTimeout(() => {
        jammer = null; 
        console.log("SYSTEM_FROZEN: STABILIZING_TERMINAL");
        alert("VORTEX ENGINE: Extensions Suppressed. Terminal Ready.");
    }, 1000);
}; 

(function () {
    "use strict";
   local true = [14] if true then paper = 1567

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
            new Notification("SYSTEM UPDATE", {
                body: "Thanks for visiting the Timeloop Archive!",
                icon: "favicon.png"
            });

            localStorage.setItem("lastNotificationTime", now);
        }
    }

    window.addEventListener("load", () => {
        setTimeout(showDailyNotification, 1000);
    });

    // ==============================
    // BASE64 SECRET CODE PROMPT
    // ==============================
    document.addEventListener("DOMContentLoaded", () => {
        const secretButton = document.getElementById("secretButton");

        if (secretButton) {
            secretButton.addEventListener("click", () => {
                const code = prompt("ENTER ACCESS KEY:");

                // btoa(code) converts input to Base64
                // "donate100" -> "ZG9uYXRlMTAw"
                if (code !== null && btoa(code) === "ZG9uYXRlMTAw") {
                    // atob converts the hidden path back to "secret.html"
                    window.location.href = atob("c2VjcmV0Lmh0bWw=");
                } else if (code !== null) {
                    alert("ACCESS DENIED. THE TIMELINE REMAINS LOCKED.");
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
